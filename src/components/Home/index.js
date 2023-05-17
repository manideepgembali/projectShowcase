import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import ProjectItem from '../ProjectItem'
import {
  MainContainer,
  HeaderContainer,
  Image,
  FailureContainer,
  Image1,
  Heading1,
  Button1,
  Para1,
  ListContainer,
  SelectContainer,
  Select,
  Option,
  UnorderedListCont,
  UnorderedList,
} from './styledComponents'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeId: categoriesList[0].id,
    listData: [],
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${activeId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      console.log(updatedData)
      this.setState({
        listData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderHeader = () => (
    <HeaderContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
        alt="website logo"
      />
    </HeaderContainer>
  )

  onChangeCategory = event => {
    this.setState({activeId: event.target.value}, this.getData())
  }

  renderSuccessView = () => {
    const {listData, activeId} = this.state
    return (
      <ListContainer>
        <SelectContainer>
          <Select value={activeId} onChange={this.onChangeCategory}>
            {categoriesList.map(each => (
              <Option key={each.id} value={each.id}>
                {each.displayText}
              </Option>
            ))}
          </Select>
        </SelectContainer>
        <UnorderedListCont>
          <UnorderedList>
            {listData.map(eachOne => (
              <ProjectItem key={eachOne.id} projectDetails={eachOne} />
            ))}
          </UnorderedList>
        </UnorderedListCont>
      </ListContainer>
    )
  }

  renderFailureView = () => (
    <FailureContainer>
      <Image1
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <Heading1>Oops! Something Went Wrong</Heading1>
      <Para1>We cannot seem to find the page you are looking for</Para1>
      <Button1 type="button" onClick={this.getData()}>
        Retry
      </Button1>
    </FailureContainer>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <MainContainer>{this.renderAllData()}</MainContainer>
      </>
    )
  }
}
export default Home
