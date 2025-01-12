const RegisterForm = ({
                         username,
                         password,
                         email,
                         loading,
                         handleRegister,
                         onEmailChange,
                         onPasswordChange,
                         onUsernameChange
                      }) => {
   return (
      <form onSubmit={handleRegister}>
         <fieldset className="form-group">
            <input
               type="text"
               placeholder="Username"
               value={username}
               className="form-control form-control-lg"
               onChange={(event) => onUsernameChange(event.target.value)}
            />
         </fieldset>
         <fieldset className="form-group">
            <input
               type="email"
               placeholder="Email"
               value={email}
               className="form-control form-control-lg"
               onChange={(event) => onEmailChange(event.target.value)}
            />
         </fieldset>
         <fieldset className="form-group">
            <input
               type="password"
               placeholder="Password"
               value={password}
               className="form-control form-control-lg"
               onChange={(event) => onPasswordChange(event.target.value)}
            />
         </fieldset>
         <button
            type="submit"
            disabled={loading}
            className="btn btn-lg btn-primary pull-xs-right"
            onClick={(event) => handleRegister(event)}
         >
            {loading ? 'Loading...' : 'Register'}
         </button>
      </form>
   );
};

export default RegisterForm;