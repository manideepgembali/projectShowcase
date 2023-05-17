import {ListContainer, Image2, Heading2} from './styledComponents'

const ProjectItem = props => {
  const {projectDetails} = props
  const {imageUrl, name} = projectDetails
  return (
    <ListContainer>
      <Image2 src={imageUrl} alt={name} />
      <Heading2>{name}</Heading2>
    </ListContainer>
  )
}
export default ProjectItem
