import ComponentRegistry from 'aem-with-react/ComponentRegistry'
import ReactParsys from 'aem-with-react/component/ReactParsys';

import { Components as SGAtoms } from '../src/styleguide/atoms'
import { Components as SGMolecules } from '../src/styleguide/molecules'
import { Components as SGOrganisms } from '../src/styleguide/organisms'
import { Components as SGEcosystems } from '../src/styleguide/ecosystems'
import { Components as SGEnvironments } from '../src/styleguide/environments'

import './global.css'

import { Components as Atoms } from '../src/com/atoms'
import { Components as Molecules } from '../src/com/molecules'
import { Components as Organisms } from '../src/com/organisms'
import { Components as Ecosystems } from '../src/com/ecosystems'
import { Components as Environments } from '../src/com/environments'

const registry = new ComponentRegistry('react-demo/components')

registry.register(ReactParsys, 'styleguide')
registry.register(ReactParsys, 'com')

SGAtoms.forEach(item => registry.register(item, 'styleguide'))
SGMolecules.forEach(item => registry.register(item, 'styleguide'))
SGOrganisms.forEach(item => registry.register(item, 'styleguide'))
SGEcosystems.forEach(item => registry.register(item, 'styleguide'))
SGEnvironments.forEach(item => registry.register(item, 'styleguide'))

Atoms.forEach(item => registry.register(item, 'com'))
Molecules.forEach(item => registry.register(item, 'com'))
Organisms.forEach(item => registry.register(item, 'com'))
Ecosystems.forEach(item => registry.register(item, 'com'))
Environments.forEach(item => registry.register(item, 'com'))

export default registry
