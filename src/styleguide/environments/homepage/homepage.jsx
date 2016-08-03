import React from 'react'
import BaseComponent from 'aem-with-react/BaseComponent'
import { Button } from '../../atoms'
import './style.css'

export default class Homepage extends BaseComponent {
  constructor(props) {
    super(props)
    this.fixedComponents = [
      'Button'
    ]
  }

  renderBody() {
    let childComponents = this.renderPrep()
    let newZone = this.createNewZone()

    let classnames = 'homepage'
    if (this.isWcmEditable()) {
      classnames += ' editable'
    }

    return (
      <div className={classnames}>
        <Button type="primary" label="Primary button" />
        <Button type="secondary" label="Secondary button" />
        { childComponents }
        { newZone }
      </div>
    )
  }
}
