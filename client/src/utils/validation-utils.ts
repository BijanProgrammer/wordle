import {toast} from 'react-toastify';

export class ValidationUtils {
    public static async isValidGuess(guess: string): Promise<boolean> {
        if (guess.length < 5) {
            toast.warn('Not enough letters');
            return false;
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/check/${guess}`);
        const isValid = await response.json();

        if (!isValid) {
            toast.warn('Not valid');
            return false;
        }

        return true;
    }
}
