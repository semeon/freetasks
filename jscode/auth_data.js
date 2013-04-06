
// http://code.google.com/apis/accounts/docs/OAuth2.html

// client_id	(required) 
// This is how Google identifies your application—Google will give you a client_id when you register your app with Google.

// redirect_uri	(required) 
// The URL on your site that will handle OAuth responses after the user takes an action on the dialog. You'll need to register the redirect_uri you'd like to use in advance. See the Registering your app with Google section for details on how to register.

// scope	(required) 
// URL identifying the Google service to be accessed. See the documentation for the API you'd like to use for what scope to specify. To specify more than one scope, list each one separated with a space.

// response_type	(required) 
// Either code or token. Use code for the server-side flow. For the client-side flow, use token.

// state	(optional) 
// A string used to maintain state between the request and redirect. This value will be appended to your redirect_uri after the user takes an action on the OAuth dialog.

var client_id = "345458471597.apps.googleusercontent.com";
