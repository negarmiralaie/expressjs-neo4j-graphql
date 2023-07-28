import { generateAccessToken, validatePassword, hashPassword } from '../components/Auth.js'; 
import { expect, jest } from '@jest/globals';

//^ jest.fn() -> creates stub. It creates a mock function and then we can control the behavior of these mock functions in our test functions
// ~ What is the use of stubs rather than original functions? Stubs are used in testing to isolate the code under test. When you're testing a function, you want to make sure that any other functions it calls don't affect the outcome of the test. By replacing those other functions with stubs, you can control their behavior and make sure they always behave in a predictable way during the test.
// ~ The generateAccessToken func uses jwt.sign so that its result is depending on weather jwt.sign woks properly or not but when we use stubs, we ensure that they always return the same value, making tests more reliable. 
// * Jest has some limitations when it comes to mocking ES modules, and this can cause errors when you try to mock them using jest.mock . When you use jest.mock to mock bcrypt and jwt, Jest replaces the real modules with mock versions. However, because of the way ES modules work, these mock versions don't behave exactly like the real modules. This can cause errors when you try to use the mocked functions in your tests. By using stubs instead of mocking the whole module, you're avoiding these issues. The stubs are just regular JavaScript functions, so they don't have the same limitations as mocked ES modules. This is why we don't get any errors by using stubs.
const signStub = jest.fn();
const compareStub = jest.fn();
const hashStub = jest.fn();

describe('generateAccessToken', () => {
    it('should generate access token', () => {
        signStub.mockReturnValue("token"); //^ so that stubSign returns "token" when it is called...

        const user = { id: 1, name: "userTestName" };
        const token = generateAccessToken(user, signStub); //^ meaning: When generateAccessToken calles jwt.sign, it actually calls created stub function that returns 'token'.

        expect(signStub).toHaveBeenCalledWith(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
        expect(token).toBe("token"); //^ Now check if returned value is 'token'

        signStub.mockReset(); //^ To reset mocks
    });
});  

describe('validatePassword', () => {
    it('should validate a password against a hashed password', async () => {
        compareStub.mockReturnValueOnce(true);

        const validPassword = await validatePassword('passwordTest', 'hashedpasswordTest', compareStub);
        expect(compareStub).toHaveBeenCalledWith('passwordTest', 'hashedpasswordTest');
        expect(validPassword).toBe(true);

        compareStub.mockReset(); // don't forget to reset the mock
    });
});

describe('hashPassword', () => {
    it('should hash a plaintext password', async () => {
        const mockHash = 'hashedTestPassword';
        hashStub.mockReturnValueOnce(mockHash);

        const hashedPassword = await hashPassword('testPassword', hashStub);
        expect(hashStub).toHaveBeenCalledWith('testPassword', 10);
        expect(hashedPassword).toBe(mockHash);

        hashStub.mockReset();
    });
});   
