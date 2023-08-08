'use client'
import React, { useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from '@nextui-org/react'
import { AuthContext } from '@/contexts/auth.context'
import { HeaderContext } from '@/contexts/header.context '

export default function Header () {
  const { userData, logout } = useContext(AuthContext)
  const { activate, setActivate } = useContext(HeaderContext)

  return (
    userData &&
      <Navbar>
        <NavbarBrand>
          <p className='font-bold text-inherit'>TALKING</p>
        </NavbarBrand>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem isActive={activate === 'chats'}>
            <Link
              onClick={(e) => {
                e.preventDefault()
                setActivate('chats')
              }} color={activate === 'chats' ? 'secondary' : 'foreground'} href='#'
            >
              Chats
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activate === 'friends'}>
            <Link
              onClick={(e) => {
                e.preventDefault()
                setActivate('friends')
              }} href='#' color={activate === 'friends' ? 'secondary' : 'foreground'}
            >
              Firends
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activate === 'profile'}>
            <Link
              onClick={(e) => {
                e.preventDefault()
                setActivate('profile')
              }} color={activate === 'profile' ? 'secondary' : 'foreground'} href='#'
            >
              Profile
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as='div' justify='end'>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                name='Jason Hughes'
                size='sm'
                src={userData.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{userData.userName}</p>
              </DropdownItem>
              <DropdownItem key='settings'>My Settings</DropdownItem>
              <DropdownItem key='team_settings'>Team Settings</DropdownItem>
              <DropdownItem key='analytics'>Analytics</DropdownItem>
              <DropdownItem key='system'>System</DropdownItem>
              <DropdownItem key='configurations'>Configurations</DropdownItem>
              <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
              <DropdownItem key='logout' onClick={logout} color='danger'>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
  )
}
