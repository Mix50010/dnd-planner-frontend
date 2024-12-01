import { API_BASE_URL } from '../api';

/**
 * Get the currently authenticated user.
 *
 * This function sends a GET request to the `/me` endpoint to retrieve the profile
 * information of the user associated with the provided authentication token.
 *
 * @param {string} token - The Bearer token used for authentication.
 * @returns {Promise<Object>} - The authenticated user's profile details.
 * @throws {Error} - If the request fails or the user is not authenticated.
 */
export const getCurrentUser = async (token) => {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch current user');
    }

    return response.json();
};
