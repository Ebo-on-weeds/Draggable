/**
 * Custom ESLint plugin enforcing unidirectional import architecture .
 *
 * Exposes two rules:
 * - no-cross-feature-imports: disallows cross-feature imports between folders in src/pages
 * - no-import-from-pages: blocks any non-page module from importing code out of src/pages
 */
const path = require('path');

// Normalize paths to POSIX style so comparisons are consistent on all platforms.
const normalize = (inputPath) => path.resolve(inputPath).replace(/\\/g, '/');

const SRC_DIR = normalize(path.join(process.cwd(), 'src'));
const PAGES_DIR = normalize(path.join(SRC_DIR, 'pages'));

// Detect whether a file lives inside a given directory tree.
const isInsideDir = (childPath, parentPath) => {
  const child = normalize(childPath);
  const parent = normalize(parentPath);
  return child === parent || child.startsWith(`${parent}/`);
};

// Extract the top-level feature folder for a page file.
const getFeatureName = (absolutePath) => {
  if (!isInsideDir(absolutePath, PAGES_DIR)) {
    return null;
  }

  const relative = normalize(absolutePath).slice(PAGES_DIR.length + 1);
  const [segment] = relative.split('/');
  return segment || null;
};

// Resolve imports to absolute targets when possible, accounting for project aliases.
const resolveImportTarget = (filename, importPath) => {
  if (!importPath) {
    return null;
  }

  const dir = path.dirname(filename);

  if (importPath.startsWith('.')) {
    return normalize(path.resolve(dir, importPath));
  }

  if (importPath.startsWith('@/')) {
    return normalize(path.join(SRC_DIR, importPath.slice(2)));
  }

  if (importPath.startsWith('@pages/')) {
    return normalize(path.join(PAGES_DIR, importPath.slice(7)));
  }

  if (importPath.startsWith('src/')) {
    return normalize(path.join(SRC_DIR, importPath.slice(4)));
  }

  // If we cannot determine the absolute file (e.g., node modules), return the original string
  return importPath;
};

module.exports = {
  rules: {
    // Rule 1: prevent cross-feature imports within src/pages
    'no-cross-feature-imports': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow importing between different feature folders inside src/pages',
        },
        schema: [],
      },
      create(context) {
        const filename = normalize(context.getFilename());

        if (!isInsideDir(filename, PAGES_DIR)) {
          return {};
        }

        const currentFeature = getFeatureName(filename);
        if (!currentFeature) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            if (!node.source || !node.source.value) {
              return;
            }

            const target = resolveImportTarget(filename, node.source.value);

            if (typeof target !== 'string') {
              return;
            }

            if (!isInsideDir(target, PAGES_DIR)) {
              return;
            }

            const targetFeature = getFeatureName(target);

            if (targetFeature && targetFeature !== currentFeature) {
              context.report({
                node,
                message: `Importing from ${targetFeature} into ${currentFeature} is FORBIDDEN as Cross-features import is not allowed inside pages.`,
              });
            }
          },
        };
      },
    },

    // Rule 2: prevent files outside pages from importing anything in pages
    'no-import-from-pages': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow any file outside pages importing from pages (unidirectional rule)',
        },
        schema: [],
      },
      create(context) {
        const filename = normalize(context.getFilename());

        if (!isInsideDir(filename, SRC_DIR) || isInsideDir(filename, PAGES_DIR)) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            if (!node.source || !node.source.value) {
              return;
            }

            const target = resolveImportTarget(filename, node.source.value);

            if (typeof target !== 'string') {
              return;
            }

            const APPLICATION_LAYER = filename.includes('/src/app/');

            // Any import that resolves back into pages violates the unidirectional rule.
            if (isInsideDir(target, PAGES_DIR) && !APPLICATION_LAYER) {
              context.report({
                node,
                message:
                  'Files outside pages folder cannot import pages files (unidirectional rule).',
              });
            }
          },
        };
      },
    },
  },
};
