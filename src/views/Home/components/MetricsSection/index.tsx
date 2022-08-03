import React from 'react'
import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon } from '@pancakeswap/uikit'
import { useGetStats } from 'hooks/api'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'

// Values fetched from bitQuery effective 13/8/21
const txCount = 44713126
const addressCount = 2607499

const Stats = () => {
  const data = useGetStats()
  const { theme } = useTheme()

  const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)

  const tvlText = 'And those users are now entrusting the platform with over $%tvl% in funds.'
  const [entrusting, inFunds] = tvlText

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <GradientLogo height="48px" width="48px" mb="24px" />
      <Heading textAlign="center" scale="xl">
        {'Develop by smart people.'}
      </Heading>
      <Heading textAlign="center" scale="xl" mb="32px">
        {'Have fun and win like a millonaire'}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {'Rock Finance is defi next generation with games and NFT market.'}
      </Text>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {'Join now!'}
      </Text>

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={` users', 200 thousand`}
            bodyText={'in the last 30 days'}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={`trades', 100 thousand`}
            bodyText={'made in the last 30 days'}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={`staked', 300 thousand`}
            bodyText={'Total Value Locked'}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
