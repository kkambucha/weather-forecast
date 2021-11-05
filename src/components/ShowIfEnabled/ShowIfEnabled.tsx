import React, { FC, ReactChild } from 'react'

const getFeatureEnvPath = (name: string) => {
  const nameUppercase = name.toUpperCase()
  return `REACT_APP_FEATURE_${nameUppercase}`
}

interface ShowIfEnabledProps {
  name: string
  children: ReactChild
}

export const ShowIfEnabled: FC<ShowIfEnabledProps> = ({
  name,
  children,
}: ShowIfEnabledProps): JSX.Element | null => {
  const processEnvValue = process.env[getFeatureEnvPath(name)]
  const enabled = processEnvValue ? JSON.parse(processEnvValue) : false

  if (enabled) return <>{children}</>
  return null
}
