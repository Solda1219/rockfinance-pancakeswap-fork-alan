import React, { useState } from 'react'
import {
  Modal,
  ModalProps,
  useModal,
  Link as UIKitLink,
  Input,
  Button,
  Toast,
  ToastContainer,
} from '@pancakeswap/uikit'
import Register from '../Register'
import useToast from 'hooks/useToast'
import authenticationService from 'services/authentication'
import Loading from '../Loading'
import { firebaseAuth } from '../../utils/firebase'
import { ifAbsentSet, profileCacheKey, profileCacheDuraction } from 'utils/storageCache'

const Login: React.FC<ModalProps> = ({ title, onDismiss, ...props }) => {
  const { toastSuccess, toastError, toastWarning } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [register] = useModal(<Register title="Register" />)
  function validate() {
    if (password === '' || email === '') {
      toastError('Email or Password cannot be blank.')
      return false
    }
    return true
  }
  async function onSubmit() {
    if (validate()) {
      setLoading(true)
      const profile = await authenticationService.login(email, password)
      if (profile && (!profile.ErrorMessage || profile.ErrorMessage === '')) {
        await firebaseAuth.signInWithEmailAndPassword(email, password)
        ifAbsentSet(profileCacheKey, profileCacheDuraction, profile)
        toastSuccess('Successful Login!')
        window.location.href = '/'
      } else {
        toastError('Unable to login')
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
      <Button onClick={onSubmit}>Submit</Button>
      <br></br>
      <UIKitLink href="#" onClick={register}>
        Register
      </UIKitLink>
    </Modal>
  )
}

export default Login
