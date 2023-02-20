const Login=()=>{
return(<form className="login">
<label>
  Email
  <input type="email" className="form-group" placeholder="email" />
</label>

<label>
  Password
  <input type="password" className="form-group" placeholder="password" />
</label>

<button type="submit">Login</button>
</form>)}
export default Login