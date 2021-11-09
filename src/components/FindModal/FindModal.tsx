import React, { FC, useCallback, useState } from 'react'

import { isGeolocationAvailable, useGeolocation } from 'libs/geolocation'
import { setToLocalStorage, getFromLocalStorage } from 'libs/localstorage'
import { City, useAppDispatch, useAppSelector } from 'store'
import { cityApiSlice } from 'store/slices/cityApi.slice'
import { addCityId } from 'store/slices/cities.slice'
import { OutsideClickWatcher } from 'components/OutsideClickWatcher'
import { Spinner } from 'components/Spinner'
import { SearchResultItem } from 'components/SearchResultItem'
import './FindModal.scss'

const FIND_MODAL_CLOSED_STATUS_NAME = 'find_modal_closed'

export const FindModal: FC = () => {
  const dispatch = useAppDispatch()
  const addedCitiesIds = useAppSelector((state) => state.cities)
  const [locationPosition, geoLocationServiceLocalStatus] = useGeolocation()
  const [isOpeningEnabled, setIsOpeningEnabled] = useState(
    () =>
      isGeolocationAvailable() &&
      !getFromLocalStorage(FIND_MODAL_CLOSED_STATUS_NAME)
  )
  const isOpen = isOpeningEnabled && geoLocationServiceLocalStatus === 'allowed'
  const fetchParams = isOpen ? {} : { skip: true }
  const {
    data: result,
    error,
    isFetching,
  } = cityApiSlice.useFetchCitiesByCoordsQuery(locationPosition, fetchParams)
  const isEmpty = !isFetching && result && !result.length

  const handleOnSelect = useCallback(
    (id: number) => {
      dispatch(addCityId({ id }))
    },
    [dispatch]
  )
  const handleClose = () => {
    setIsOpeningEnabled(false)
    setToLocalStorage(FIND_MODAL_CLOSED_STATUS_NAME, true)
  }

  return (
    <>
      {isOpen && (
        <div className="FindModal">
          <div className="FindModal_overlay" />
          <OutsideClickWatcher onClickOutside={handleClose}>
            <div className="FindModal_container">
              <div className="FindModal_content">
                <button className="FindModal_close" onClick={handleClose}>
                  X
                </button>
                {isFetching ? (
                  <Spinner />
                ) : (
                  <>
                    {error ? (
                      <>
                        <h2 className="FindModal_title">
                          Something went wrong
                        </h2>
                        <p className="FindModal_description">
                          Try to check your connection
                        </p>
                      </>
                    ) : (
                      <>
                        {isEmpty ? (
                          <h2 className="FindModal_title">
                            We did not find cities around you :(
                          </h2>
                        ) : (
                          <>
                            <h2 className="FindModal_title">
                              We found some cities around you
                            </h2>
                            <p className="FindModal_description">
                              You can add one to your list
                            </p>
                            {result && (
                              <ul className="FindModal_resultList">
                                {result.map((city: City, index) => (
                                  <SearchResultItem
                                    key={city.id}
                                    city={city}
                                    index={index}
                                    disabled={addedCitiesIds.includes(city.id)}
                                    onSelect={handleOnSelect}
                                  />
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </OutsideClickWatcher>
        </div>
      )}
    </>
  )
}
