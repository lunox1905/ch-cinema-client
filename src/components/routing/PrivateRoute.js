import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import PageNotFound from '../Notfound'

const PrivateRoute = ({ Component }) => {
	const {
		authState: { authLoading, isAuthenticated, user }
	} = useContext(AuthContext)
	
	if (authLoading)
		return (
			<div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
		)
	return (isAuthenticated && user.role === 'admin') ? Component : <PageNotFound />
}

export default PrivateRoute