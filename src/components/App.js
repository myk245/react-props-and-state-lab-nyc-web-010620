import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  handleFindPetsClick = () => {
    let petFilter = this.state.filters.type 
    if (petFilter === "all") {
      fetch("/api/pets")
        .then(resp => resp.json())
        .then(returnedPets => this.setState({ pets: returnedPets }))
    } else {
      fetch(`/api/pets?type=${petFilter}`)
        .then(resp => resp.json())
        .then(returnedPets => this.setState({ pets: returnedPets }))
    }
  }

  handlePetAdoption = (petId) => {
    let petArray = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })
    this.setState({
      pets: petArray
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.handleFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handlePetAdoption} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
