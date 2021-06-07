# jscodeshift-script

### Install
Get jscodeshift from npm:
```
$ npm install -g jscodeshift
```

### run script
```
jscodeshift -t YOUR_TRANSFORM_SCRIPT(eg. .\import-statement-migration.js) YOUR_TARGET_PROJECT
```
```
jscodeshift --extensions=tsx --parser=tsx -t YOUR_TRANSFORM_SCRIPT(eg. .\import-statement-migration.js) YOUR_TARGET_PROJECT
