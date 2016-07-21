import * as React from 'react'
import Button from '../Button'
import { storiesOf, action } from '@kadira/storybook'

storiesOf('Atom: Button', module)
  .add('Primary button', () => (
    <Button root={true}>Primary button</Button>
  ))
  .add('Secondary button', () => (
    <Button root={true} type='secondary'>Secondary button</Button>
  ))
