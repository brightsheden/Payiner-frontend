

import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

function AlertComponent({variant, message}) {
  return (
    <Alert color={variant} icon={HiInformationCircle}>
      <span className="font-medium">Info alert!</span> {message}
    </Alert>
  );
}

export default AlertComponent
