import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const AccountSkeleton = () => {
  return (
    <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item flexDirection="column" alignItems="center"  marginTop={10}>
      <SkeletonPlaceholder.Item width={120} height={24} borderRadius={4} marginBottom={10} />
      <SkeletonPlaceholder.Item width={200} height={48} borderRadius={4} marginBottom={10} />
      <SkeletonPlaceholder.Item width={200} height={48} borderRadius={4} marginBottom={10} />
      <SkeletonPlaceholder.Item width={120} height={48} borderRadius={4} marginBottom={10} />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
  )
}

export default AccountSkeleton

const styles = StyleSheet.create({})