import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import { METRICS } from '../../constants/metrics'

import { DataPoint, TMetrics } from '../../types/data'

import { MetricInfo } from './styles'

interface IProps {
  selectedDataPoint?: DataPoint
  setSelectedDataPoint: Dispatch<SetStateAction<DataPoint | undefined>>
  setSearchedDataPoint: Dispatch<SetStateAction<DataPoint | undefined>>
}

const InfoModal = ({
  selectedDataPoint,
  setSelectedDataPoint,
  setSearchedDataPoint,
}: IProps) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const handleClose = () => {
    setSearchedDataPoint(undefined)
    setSelectedDataPoint(undefined)
    setIsFavorited(false)
  }
  return (
    <Modal onClose={handleClose} open={!!selectedDataPoint}>
      {selectedDataPoint && (
        <>
          <Modal.Header>{selectedDataPoint.name}</Modal.Header>
          <Modal.Content image>
            <Image size="small" src={selectedDataPoint.image_url} wrapped />
            <Modal.Description>
              <Header>{selectedDataPoint.tagline}</Header>
              <MetricInfo>
                <p>
                  <span>Description:</span>&nbsp;
                  {selectedDataPoint.description}
                </p>
              </MetricInfo>
              {METRICS.map(({ value, text }) => {
                return (
                  <MetricInfo key={value}>
                    <p>
                      <span>{text}:</span>&nbsp;
                      {selectedDataPoint[value as TMetrics]}
                    </p>
                  </MetricInfo>
                )
              })}
              <MetricInfo>
                <p>
                  <span>Brewer's tips:</span>&nbsp;
                  {selectedDataPoint.brewers_tips || '-'}
                </p>
              </MetricInfo>
              {selectedDataPoint.food_pairing && (
                <MetricInfo>
                  <p>
                    <span>Food pairings:</span>&nbsp;
                    {selectedDataPoint.food_pairing.join(', ')}
                  </p>
                </MetricInfo>
              )}
            </Modal.Description>
          </Modal.Content>
        </>
      )}
      <Modal.Actions>
        <Button color="black" onClick={handleClose}>
          Close
        </Button>
        <Button
          content={isFavorited ? 'Unfavorite' : 'Favorite'}
          labelPosition="right"
          icon={isFavorited ? 'heart' : 'heart outline'}
          onClick={() => setIsFavorited((prev) => !prev)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default InfoModal
