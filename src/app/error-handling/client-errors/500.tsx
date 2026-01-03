import type { ErrorComponentProps } from '@tanstack/react-router';
import React from 'react';

interface ErrorPage500Props {
  ErrorComponentProps: ErrorComponentProps;
}

//TODO : Improve the UI of this page

function ErrorPage500({ ErrorComponentProps }: ErrorPage500Props) {
  return <div>{ErrorComponentProps.error.message}</div>;
}

export default ErrorPage500;
