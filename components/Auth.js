// * Here, functions get stubbed functions as a argument to use them rather than jwt/bcrypt functions.
// * Note that these stubs are used only if provided so that in production, eal functions are used and in test, stubs are used
export function generateAccessToken(user, mockSign = jwt.sign) {
    const accessToken = mockSign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
    return accessToken;
}

export async function validatePassword(password, hash, mockCompare = bcrypt.compare) {
    try {
        return await mockCompare(password, hash);
    } catch {
        throw new Error('Invalid password');
    }
}

export async function hashPassword(password, mockHash = bcrypt.hash) {
    try {
        return await mockHash(password, 10);
    } catch {
        throw new Error('Failed to hash password');
    }
}