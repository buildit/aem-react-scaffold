import * as React from 'react'
import Button from '../Button'
import { storiesOf } from '@kadira/storybook'

storiesOf('Atom: Button', module)
  .add('Primary button', () => (
    <Button root>Primary button</Button>
  ))
  .add('Secondary button', () => (
    <Button root type="secondary">Secondary button</Button>
  ))
