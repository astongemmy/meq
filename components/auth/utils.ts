export const passwordRequirements = [
	"Password must be at least 8 characters long.",
	"Include a mix of uppercase and lowercase letters.",
	"Include at least one numerical digit (0-9).",
	"Include at least one special character (e.g., !, @, #, $, etc.).",
];
 
export const isPasswordAcceptable = (password: string): boolean => {
	// Check if password contains at least one digit
	const hasNumber = /[0-9]/.test(password);

	// Check if password contains at least one special character
	const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

	// Check if password is at least 8 characters long
	const isLengthValid = password.length >= 8;

	// Check if password contains at least one uppercase letter
	const hasUpperCase = /[A-Z]/.test(password);

	// Check if password contains at least one lowercase letter
	const hasLowerCase = /[a-z]/.test(password);

	// Return true if all conditions are met, otherwise return false
	return hasNumber && hasSpecialChar && isLengthValid && hasUpperCase && hasLowerCase;
};

export const doesPasswordsMatch = (referenceValue: string, comparedValue: string, falbackValue: boolean) => {
	if (comparedValue) return comparedValue !== referenceValue;
	return falbackValue;
};

export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};