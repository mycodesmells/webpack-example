# Webpack Simple Example

Have you ever scratched your head when you realized how many scripts you need to import into your HTML page for your web application to work? If you are developing anything more complicated than _Hello world_, you most likely reach this moment sooner or later. You somehow know, that it would be much more efficient if you pack it all together into a few (or maybe just one?) files and send it more efficiently over HTTP to the browser. How could you do that? Is it worth it?

### The idea behind Webpack

Have you ever heard about Node's famous code reusability between back-end and front-end? I'm sure you have! Have you tried it yet? If no, don't worry. Webpack is a great tool that makes it incredibly easy! I remember when I started working with Node, not aware of how to reuse the modules, I was getting tired of importing underscorejs twice. What's the point of writing your server in Java Script, if you need to do your work twice - just as you would need to do if your backend was in Java, Python or Go.

Simply put, Webpack tries to immitate the behaviour of Node's code interpreter: it will start at some entry point, then go through all referenced files/packages and include them into one output file. As a matter of fact, if you are comfortable with Node's `require` syntax you might find Webpack useful for more your projects, not only those in full JS stack. But back to Webpack, there is few things to remember for a simple example. Basically you need an entry point and a name for output file. Then, in your HTML file you need to point to that single file and forget about loading numerous scripts to your page.

### Backend code

In our example project we are creating a simple model class which will be used in both backend and frontend scripts. It reads a JSON with person's metadata and provides two utility functions:

	// ./models/Person.js
	function Person(data) {
	    this.getFullName = function () {
	        return data.firstName + " " + data.lastName;
	    };

	    this.isAdult = function () {
	        return data.age >= 18;
	    };
	}

	module.exports = Person;

Now let's take a look on our main server script that will set up an endpoint returning a _Person_ class instance. The request handler mocks a database response:

	// app.js
	// ...
	var Person = require('./models/Person');
	app.get('/person', (req, res) => {
	    let personData = {firstName: 'Adam', lastName: 'Smith', age: 23};

	    var p = new Person(personData);
	    console.log("=== ON SERVER SIDE ===");
	    console.log(p.getFullName());
	    console.log(p.isAdult());
	    console.log("======================");

	    res.json(personData);
	}); 
	// ...

As you can see, whenever there user requests `/person` address, the server not only returns the data, but also loggs person's full name and information if they are adult or not. This prooves that we are using additional information extracted from JSON using _Person_ class.

### Frontend code

Our frontend code will be slightly more complicated, just to show you that we can import many script files into our entry script. The script does just one thing: asks our server for our sample person and prints information about the to the browser's console (in a similar format as logs from server). To make a AJAX query we choose to use [reqwest](https://github.com/ded/reqwest) package.

	// ./web/fetchData.js
	var reqwest = require('reqwest');

	function fetchData(callback) {
	    reqwest({
	        url: '/person',
	        method: 'get',
	        dataType: 'json',
	        success: function(personData) {
	            callback(null, personData);
	        },
	        error: callback
	    });
	}

	module.exports = fetchData;

Then in our entry script should use this `fetchData` function. Note, that the script above imports an external package, then it is imported into the entry file. This means, that Webpack will import all requirements recursively. Then in our entry file we are making use of `fetchData` and print information to the console.

	// ./web/entry.js
	var Person = require('../models/Person');
	var fetchData = require('./fetchData');

	fetchData(function(err, personData) {
	    console.info("=== ON CLIENT SIDE ===");
	    var person = new Person(personData);
	    console.log(person.getFullName());
	    console.log(person.isAdult());
	    console.info("======================");
	});

### Build and run

There are two steps necessary to use our _packed_ script in an HTML page: building an output script and updating template file. Running webpack in its most basic configuration is very easy:

	./node_modules/.bin/webpack web/entry.js public/bundle.js

This means that the webpack script should take `web/entry.js` file as our entry point, import all dependencies and put all this into output file - `public/bundle.js`. The output of this command should look similar to this:

	> webpack-example@1.0.0 webpack /opt/workspace/blog-repos/webpack-example
	> webpack web/entry.js public/bundle.js

	Hash: e1b61c8d433750c13679
	Version: webpack 1.12.2
	Time: 80ms
	    Asset     Size  Chunks             Chunk Names
	bundle.js  22.7 kB       0  [emitted]  main
	   [0] ./web/entry.js 324 bytes {0} [built]
	   [1] ./models/Person.js 210 bytes {0} [built]
	   [2] ./web/fetchData.js 301 bytes {0} [built]
	    + 2 hidden modules

You can check, that our output file has really been created in _public_ directory. Now we need to edit our template so that is uses this _packed_ script. In this example project we are using jade templating engine, so our output `index.html` looks like this:

	html
	    head
	        script(src='/public/bundle.js')
	    body
	        h1 Webpack example

After starting the application we can enter its main page and look into both server's and browser's console and see expected results:

<img src="https://raw.githubusercontent.com/mycodesmells/webpack-example/master/posts/images/common-code-example.png"/>
