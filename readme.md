Car Club
=============================

微信公众服务［GC车友会］，专注挪车30年！

### Dependencies:

* Please check the package.json file.

### How to run in development environment

1. You have to start local MongoDB instance or can connect to the remote MongoDB instance.

* Please check the config.js file.

2. Go to the project directory

        $ cd carclub

3. Install required Node.js modules, this step will automatically build the project

        $ npm install

4. Start Node.js HTTP server in development environment

        $ NODE_ENV=development node app

5. Visit address [http://localhost:3030](http://localhost:3030)

6. Enjoy!

注意: 代码中所有被标为<***>的地方,都是敏感信息,已隐去,需要配置成你自己的合法信息。