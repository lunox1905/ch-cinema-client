import Auth from '../Auth'

const ProtectedRoute = ({ Component }) => {
	return (
		<>
			<Auth/>
			{Component}
		</>
	)
}

export default ProtectedRoute