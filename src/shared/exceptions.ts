export class PackageJsonNotFoundException extends Error {
  name = 'PackageJsonNotFoundException'

  constructor() {
    super(
      'Cannot find package.json in the root. ' +
        'Please specify root directory manually using "configure" parameters'
    )
  }
}

export class JsconfigNotFoundException extends Error {
  name = 'JsconfigNotFoundException'

  constructor() {
    super(
      'Cannot find jsconfig.json in the root. ' +
        'Please specify root directory manually using "configure" parameters, ' +
        'or use "jsconfig" option in "alias" preset'
    )
  }
}
