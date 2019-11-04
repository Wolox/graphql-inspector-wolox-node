# graphql-inspector-wolox-node

## Summary
Simple schema inspector that uses `graphql-inspector` for comparing schemas looking for differences between them and categorizing them into three possible categories:
* NON_BREAKING
* DANGEROUS
* BREAKING

At last, if no breaking changes are found, it replace the old schema with the new schema.

## Installing
Install with `npm install graphql-inspector-wolox-node`.

## Usage
It must be called with: `graphql-inspector-wolox-node <oldSchemaPath> <newSchemaPath>`.

Supported extensions: 
* oldSchemaPath:
  * .graphql
  * .json
* newSchemaPath:
  * .js file that exports a GraphQLType variable named schema.

## Local running

Since the package has graphql as peer dependence, if the package is not installed with `npm install graphql-inspector-wolox-node`, the next steps are required:

1. Download the package
2. In the package folder:
    * `npm install`
    * `npm link`
3. In your project folder:
    * `npm link graphql-inspector-wolox-node`
    * In `/node_modules/graphql-inspector-wolox-node` run `npm link graphql` to install peer dependece.
4. Call the package with `graphql-inspector-wolox-node <oldSchemaPath> <newSchemaPath>`.


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## About

This project is maintained by [Wolox](https://github.com/wolox) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**graphql** is available under the MIT [license](LICENSE.md).

    Copyright (c) 2019 Wolox

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.