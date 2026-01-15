// useLoginForm.js
const useLoginForm = () => {
    const validateUser = async (name, password) => {
      console.log("Api calling");
console.log("Login URL:", process.env.REACT_APP_API_URL_Login);
  
      try {
        console.log("Api url",process.env.REACT_APP_API_URL_Login);
        const response = await fetch(process.env.REACT_APP_API_URL_Login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: name,
            password: password,
          }),
        });
  
        if (!response.ok) {
          console.error("Login request failed with status:", response.status);
          return false; // HTTP error
        }
  
        const result = await response.json(); // backend returns true/false
        if (result === true) {
          console.log("User authenticated");
        } else {
          console.warn("Invalid username or password");
        }
        console.log("result",result);
        return result === true;
      } catch (error) {
        console.error("Error calling login API:", error);
        return false; // network or other error
      }
    };
  
    return {
      validateUser,
    };
  };
  
  export default useLoginForm;
  