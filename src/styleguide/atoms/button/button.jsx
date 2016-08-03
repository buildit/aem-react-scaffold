import React from 'react'
import BaseComponent from 'aem-with-react/BaseComponent'
import classNames from 'classnames'
import './Button.css'

export default class Button extends BaseComponent {
  renderBody() {
    const { clickHandler, type, label } = this.props
    const cls = classNames('Button', { 'Button--primary': !type, [`Button--${type}`]: type })
    const text = label || 'My button'

    return (
      <button className={cls} onClick={clickHandler}>{text}</button>
    )
  }
}
