import React, { useState, useEffect } from 'react'
import {
  Menu as UikitMenu,
  UserMenu,
  UserMenuItem,
  Flex,
  LogoutIcon,
  ModalProps,
  Modal,
  Heading,
  Button,
  useModal,
  IconButton,
  NoProfileAvatarIcon,
  CogIcon,
  Link,
} from '@rock-finance/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import config from './config'
import { firebaseAuth } from 'utils/firebase'
import { get, ifAbsentSet, profileCacheKey, profileCacheDuraction, remove } from 'utils/storageCache'
import { useWeb3React } from '@web3-react/core'
import Loading from '../Loading'
import authenticationService from 'services/authentication'
import Login from '../Login'
import ProfileModel from 'models/profile'

const UserMenuComponent: React.FC<{ account?: string }> = ({ account }) => {
  const [loading, setLoading] = useState(false)
  async function logout() {
    const profile = get(profileCacheKey)
    if (!profile) return
    setLoading(true)
    await authenticationService.logout(profile)
    setLoading(false)
    remove(profileCacheKey)
    window.location.href = '/'
  }
  return (
    <UserMenu account={account} variant={'default'}>
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          Logout
          <LogoutIcon />
        </Flex>
        {loading && <Loading />}
      </UserMenuItem>
    </UserMenu>
  )
}

const GlobalMenuModal: React.FC<ModalProps> = ({ title, onDismiss, ...props }) => (
  <Modal title={title} onDismiss={onDismiss} {...props}>
    <Heading>{title}</Heading>
    <Button>This button Does nothing</Button>
  </Modal>
)

const GlobalMenuComponent: React.FC = () => {
  useEffect(() => {
    renderLogin()
  }, [])
  const [login] = useModal(<Login title="Login" />)
  const [globalSettings] = useModal(<GlobalMenuModal title="Global Settings Modal" />)
  const [profileModel, setProfileModel] = useState(null)
  async function renderLogin() {
    const firebaseProfile = firebaseAuth.currentUser
    setProfileModel(null)
    if (firebaseProfile == null) {
      const cachedProfile = get(profileCacheKey) as ProfileModel
      setProfileModel(cachedProfile)
    } else {
      const signedInProfile = await authenticationService.getProfile(firebaseProfile.email)
      setProfileModel(signedInProfile)
      if (profileModel != null) {
        ifAbsentSet(profileCacheKey, profileCacheDuraction, profileModel)
      }
    }
  }
  return (
    <Flex>
      {(!profileModel || !profileModel.IsAuthenticated) && (
        <IconButton onClick={login} variant="text" scale="sm" mr="4px">
          <NoProfileAvatarIcon height={22} width={22} color="textSubtle" />
        </IconButton>
      )}
      {profileModel && profileModel.IsAuthenticated && (
        <Link href="#">{'Affiliate Link = ' + window.location.hostname + profileModel.AffiliateId}</Link>
      )}
      <IconButton onClick={globalSettings} variant="text" scale="sm" mr="8px">
        <CogIcon height={22} width={22} color="textSubtle" />
      </IconButton>
    </Flex>
  )
}

const Menu = (props) => {
  const { account } = useWeb3React()
  const isDark = true;
  const cakePriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <UikitMenu
      userMenu={<UserMenuComponent account={account as string} />}
      globalMenu={<GlobalMenuComponent />}
      isDark={isDark}
      //toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      rockPriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
