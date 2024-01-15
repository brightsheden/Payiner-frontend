

const NewPasswordPage = () => {
  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">New Password</h2>
        
        {/* New Password Form */}
        <form>
            {/* New Password Field */}
            <div className="mb-4">
            <label htmlFor="Passcode" className="block text-sm font-medium text-gray-600">Passcode</label>
            <input type="text" id="passcode" name="passcode" className="mt-1 p-2 w-full rounded border border-gray-300" />
          </div>
          {/* New Password Field */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
            <input type="password" id="newPassword" name="newPassword" className="mt-1 p-2 w-full rounded border border-gray-300" />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full rounded border border-gray-300" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500">Submit</button>
        </form>

        {/* Additional Content */}
        <div className="mt-4 text-sm text-gray-600">
          <p>Create a new password for your account.</p>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
