import React, { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorElement: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Помилка {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Сталася невідома помилка</div>;
  }
};

export default ErrorElement;