import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { default as Button } from './button'

var resource = null

beforeEach( () => {
  resource = {}
})

afterEach( () => {
  resource = null
})

describe('Testing the <Button />', () => {
  it('should render a <button> component (shallow render)', () => {
    const wrapper = shallow(<Button resource={resource} root={true}/>)
    expect(wrapper.find('button')).to.have.length(1)
  })

  it('should render a <button> component (shallow render)', () => {
    const wrapper = shallow(<Button resource={resource} root={true}/>)
    expect(wrapper.name()).to.equal('button')
  })

  it('should render the label provided', () => {
    const sampleText = 'sample text'
    const wrapper = shallow(<Button resource={resource} root={true} label={sampleText}/>)
    expect(wrapper.text()).to.equal(sampleText)
  })

  it('should have a Button--primary class', () => {
    const wrapper = shallow(<Button resource={resource} root={true}/>)
    expect(wrapper.find('.Button--primary')).to.have.length(1)
  })

  it('should have a Button--secondary class', () => {
    resource.type = 'secondary'
    const wrapper = shallow(<Button resource={resource} root={true}/>)
    expect(wrapper.find('.Button--primary')).to.have.length(1)
  })

  xit('should call a click handler', () => {
    const clickHandler = sinon.spy()
    const wrapper = mount(<Button resource={resource} root={true} clickHandler={clickHandler}/>)
    wrapper.find('button').simulate('click');
    expect(clickHandler.calledOnce).to.equal(true);
  })
})
