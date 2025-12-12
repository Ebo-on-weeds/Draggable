/**
 * ESLint plugin enforcing kebab-case naming inside src.
 *
 * Rule: enforce-kebab-casing — walks the src directory and reports any file or
 * folder whose name is not kebab-case. Reports are cached per lint run so
 * repeated files do not duplicate errors.
 */
const fs = require('fs');
const path = require('path');

const normalize = (inputPath) => path.resolve(inputPath).replace(/\\/g, '/');
const KEBAB_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SRC_DIR = normalize(path.join(process.cwd(), 'src'));

// Per-run cache to avoid hitting the filesystem repeatedly.
const state = {
  issues: null,
  reported: new Set(),
  fallbackReported: false,
};

// Eagerly walk the src directory to discover naming violations.
const collectIssues = () => {
  const issues = [];

  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (err) {
      return;
    }

    entries.forEach((entry) => {
      const absolutePath = path.join(dir, entry.name);
      const normalizedAbsolute = normalize(absolutePath);
      const relativePath = normalizedAbsolute.slice(SRC_DIR.length + 1);

      if (entry.isDirectory()) {
        // Validate folder names before descending further.
        if (!KEBAB_PATTERN.test(entry.name)) {
          issues.push({
            type: 'folder',
            relativePath,
            absolutePath: normalizedAbsolute,
            name: entry.name,
          });
        }
        walk(absolutePath);
      } else {
        // Only inspect the portion before the extension for files.
        const baseName = entry.name.split('.')[0];
        if (!KEBAB_PATTERN.test(baseName)) {
          issues.push({
            type: 'file',
            relativePath,
            absolutePath: normalizedAbsolute,
            name: entry.name,
          });
        }
      }
    });
  };

  if (fs.existsSync(SRC_DIR)) {
    walk(SRC_DIR);
  }

  return issues;
};

const ensureIssues = () => {
  if (!state.issues) {
    state.issues = collectIssues();
    state.reported = new Set();
    state.fallbackReported = false;
  }
  return state.issues;
};

const isInsideSrc = (filename) => normalize(filename).startsWith(`${SRC_DIR}/`);

module.exports = {
  rules: {
    'enforce-kebab-casing': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure folders and files under src use kebab-case names',
        },
        schema: [],
      },
      create(context) {
        const filename = normalize(context.getFilename());
        if (!isInsideSrc(filename)) {
          return {};
        }

        const issues = ensureIssues();

        return {
          Program() {
            issues.forEach((issue) => {
              if (state.reported.has(issue.relativePath)) {
                return;
              }

              if (issue.type === 'file') {
                if (filename === issue.absolutePath) {
                  state.reported.add(issue.relativePath);
                  context.report({
                    loc: { line: 1, column: 0 },
                    message: `Use kebab-case for file inside src: "${issue.relativePath}"`,
                  });
                }
                return;
              }

              if (issue.type === 'folder') {
                if (filename.startsWith(`${issue.absolutePath}/`)) {
                  state.reported.add(issue.relativePath);
                  context.report({
                    loc: { line: 1, column: 0 },
                    message: `Use kebab-case for folder inside src: "${issue.relativePath}"`,
                  });
                }
              }
            });

            // If we did not visit the violating file/folder, fall back to a generic report.
            if (!state.fallbackReported && state.reported.size < issues.length) {
              issues.forEach((issue) => {
                if (state.reported.has(issue.relativePath)) {
                  return;
                }
                const FILE_EXTENSION = issue.relativePath.split('/').at(-1).split('.').at(-1);
                if (FILE_EXTENSION == 'md') return; // if the file is a MarkDown just ignore it and get out

                state.reported.add(issue.relativePath);
                state.fallbackReported = true;
                context.report({
                  loc: { line: 1, column: 0 },
                  message: `Use kebab-case for ${issue.type} inside src: "${issue.relativePath}"`,
                });
              });
            }
          },
        };
      },
    },
  },
};
