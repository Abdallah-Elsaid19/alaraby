"use client"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import NavItem from './NavItem'


const navigation = [
  { name: "Home", href: "/" },
  { name: "About US", href: "/about" },
  { name: "Our Doctors", href: "/doctors" },
  { name: "Book your online visit", href: "/appointment" },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  return (
    <Disclosure
      as="nav"
      className="sticky z-50 top-0 w-full bg-[#004E59] backdrop-blur-md dark:bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-black/5 dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 dark:text-gray-400 hover:bg-teal-600  dark:hover:bg-white/5 hover:text-black dark:hover:text-white ">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden text-gray-200 dark:text-gray-300" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block text-gray-200 dark:text-gray-300 " />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> 
            <div className="flex shrink-0 items-center">

            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              {navigation.map((item) => (
                 <NavItem key={item.name} href={item.href}>
                  {item.name}
                 </NavItem>
              ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            <ThemeToggle />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-200 text-black dark:bg-gray-950/50 dark:text-white' : 'text-gray-200 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
