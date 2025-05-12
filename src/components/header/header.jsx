import React from 'react'

export default function header() {

        return (
          <header className='header'>
      
          <nav className='navbar'>
            <div className='heading'>
              <h1 className='heading__title'>Dashboard</h1>
              <h2 className='heading__status'>You have <span className='highlight'>5 Tasks!</span></h2>
            </div>
      
            <div className='project-container'>
              <button className='btn btn-grey project-container__button'>
                PGM-3
              </button>
      
              <button className='btn btn-grey project-container__button'>
                PGM-4
              </button>
            </div>
          </nav>
      
          </header>
      
      
      
        );
      }

