import React, { useState } from 'react'
import { Modal, ModalProps, Input, Button } from '@pancakeswap/uikit'
import httpUtil from 'utils/http'
import profileModel from 'models/profile'
import authenticationService from 'services/authentication'
import { firebaseAuth } from 'utils/firebase'
import useToast from 'hooks/useToast'
import { ifAbsentSet, profileCacheKey, profileCacheDuraction } from 'utils/storageCache'
import Loading from '../Loading'

const Register: React.FC<ModalProps> = ({ title, onDismiss, ...props }) => {
  const [loading, setLoading] = useState(false)
  const { toastSuccess, toastError, toastWarning } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  function validate() {
    if (password === '' || email === '') {
      toastError('Email or Password cannot be blank.')
      return false
    }
    if (password !== confirmPassword) {
      toastError('Password does not equal confirm password.')
      return false
    }
    return true
  }
  async function onSubmit() {
    if (validate()) {
      setLoading(true)
      const referralId = httpUtil.getUrlParamValue('referralId')
      const newProfile = profileModel.NewProfile(email, password, null, null, false, null, referralId, null)
      const profile = await authenticationService.register(newProfile)
      if (!profile.ErrorMessage || profile.ErrorMessage === '') {
        await firebaseAuth.createUserWithEmailAndPassword(email, password)
        ifAbsentSet(profileCacheKey, profileCacheDuraction, profile)
        toastSuccess('success')
        window.location.href = '/'
      } else {
        toastError(profile.ErrorMessage)
      }
      setLoading(false)
    }
  }
  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      {loading && <Loading />}
      <Input type="text" scale={'md'} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br></br>
      <Input
        type="password"
        scale={'md'}
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <Input
        type="password"
        scale={'md'}
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br></br>
      <Button onClick={onSubmit}>Submit</Button>
    </Modal>
  )
}

export default Register
