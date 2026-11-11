import type { ReactNode } from "react";
import Alert from "react-bootstrap/Alert";

interface ErrorAlertProps {
	children: ReactNode;
}

const ErrorAlert = ({ children }: ErrorAlertProps) => {
	return (
		<Alert variant="danger">
			<Alert.Heading>Error</Alert.Heading>
			{children}
		</Alert>
	)
}

export default ErrorAlert;
