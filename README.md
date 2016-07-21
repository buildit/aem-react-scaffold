# AEM-React Scaffold Project

## Build/deploy to AEM

To quickly build and deploy after cloning:

```shell
npm install
npm run deploy
```

### NPM scripts in detail

* Create new component with generator: `npm run generator`
* Build: `npm run build`
* Test (watch and produce HTML reports): `npm run test`
* Test (single run for prod and cobertura reports): `npm run test:prod`
* Build & test (single run): `npm run start`
* Deploy to AEM (will build, run tests and push to AEM): `npm run deploy`
* Run storybook on local server: `npm run storybook`

### Creating components

You should use the generator to create components. This will make sure things go in the right place plus
it will generate the AEM boilerplate code that needs to go with each component. The project is setup so that
you can have a deployable site (_src/com_) and an associated styleguide site (_src/styleguide_). Feel free to
rearrange as needed but keep in mind you'll have to update the generator if you change these paths.

_src/content_ has the AEM boilerplate. Normally you do not have to touch this, however you may need to if 
you want to start restricting what can and cannot be shown in the sidekick when authoring.

In general you should only be working in _src/com_ and _src/styleguide_.

### Sample page

A sample page is included at http://localhost:4502/content/react-demo/sample-page.html?wcmmode=disabled
After deployment you should be able to see it. This contains the sample components under the src directory.

### Related projects

* [Yeoman generator for creating components](https://www.npmjs.com/package/generator-aem-with-react)
* [AEM-with-react package](https://www.npmjs.com/package/aem-with-react)

This project is based on the [AEM React](https://github.com/sinnerschrader/aem-react) project by [SinnerSchrader](https://github.com/sinnerschrader).
