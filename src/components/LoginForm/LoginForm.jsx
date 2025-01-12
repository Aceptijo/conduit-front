const LoginForm = ({email, password, handleLogin, onEmailChange, onPasswordChange, loading}) => {
   return (
      <form onSubmit={handleLogin}>
         <fieldset className="form-group">
            <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(event) => onEmailChange(event.target.value)}
               className="form-control form-control-lg"
            />
         </fieldset>
         <fieldset className="form-group">
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(event) => onPasswordChange(event.target.value)}
               className="form-control form-control-lg"
            />
         </fieldset>
         <button
            type="submit"
            disabled={loading}
            onClick={(event) => handleLogin(event)}
            className="btn btn-lg btn-primary pull-xs-right"
         >
            {loading ? "Loading..." : "Log In"}
         </button>
      </form>
   );
};

export default LoginForm;