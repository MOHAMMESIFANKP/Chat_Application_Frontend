import { Card, Select, Option } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaLocationDot } from "react-icons/fa6";
import { AllUserList, UserDetailsAndFriends } from '../../Service/Services';
import { useSelector } from 'react-redux';

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}


function PeopleList() {
  const { UserInfo } = useSelector((state) => state.user);
  const [Search, setSearch] = useState('')
  const [selectedOption, setSelectedOption] = useState('People');
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState('')
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);


  const handleOptionChange = (event) => {
    setSelectedOption(event);
  };
  // UsersList
  const GetAllUserListFuc = async () => {
    try {
      const res = await AllUserList(Search, UserInfo.id)
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const GetProfileFunc = async (id) => {
    try {
      const res2 = await UserDetailsAndFriends(id, UserInfo.id)
      if (res2.status === 200) {
        setProfile(res2.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(profile, 'daxoo');
  useEffect(() => {
    GetAllUserListFuc()

  }, []);
  return (
    <Card className='m-5 p-5 grid grid-cols-2 bg-gray-300 gap-6'>
      <div className='w-full grid grid-rows-[3rem,2rem,1fr] gap-2'>
        <div className='w-full grid grid-cols-[1fr,15rem] gap-5'>
          <input
            type="text"
            className='w-full rounded-lg h-12 bg-gray-50 shadow-xl focus:outline-none pl-3 pr-10' // Adjusted ps-3 to pl-3 and added pr-10
            placeholder='Search'

          // value={Search}
          />
          <Select
            className='rounded-lg h-12 bg-gray-50 shadow-xl focus:outline-none'
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <Option value='People'>People</Option>
            <Option value='Requests'>Requests</Option>
            <Option value='My Friends'>My Friends</Option>
          </Select>
        </div>
        <p className='text-xl font-bold text-black'>People</p>
        <div className='w-full h-full'>
          <Card className="w-full overflow-x-auto max-h-[48rem]">
            {selectedOption === 'People' ? (<List>
              {users.filter((user, index) => user.is_friends === 'not_friends').map((user, index) => (
                <ListItem key={index} onClick={() => GetProfileFunc(user.id)}>
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src={user.profile_image ? user.profile_image : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"} />
                  </ListItemPrefix>
                  <div className='grid grid-cols-[1fr,4rem] w-full'>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {user.first_name} {user.last_name}
                      </Typography>
                      <Typography variant="small" color="gray" className="font-normal">
                        {user.email}
                      </Typography>
                    </div>
                    <div className='flex justify-center items-center'>
                      {user.is_friends === 'not_friends' ? (
                        <button className='bg-green-400 text-white font-bold text-sm p-2 rounded-md'>Connect</button>
                      ) : user.is_friends === 'pending' ? (
                        <button className='bg-yellow-600 text-white font-bold text-sm p-2 rounded-md'>Pending</button>
                      ) : (
                        <button className='bg-red-400 text-white font-bold text-sm p-2 rounded-md'>Remove</button>
                      )}

                    </div>
                  </div>
                </ListItem>
              ))}
            </List>) : selectedOption === 'Requests' ? (
              <List>
                {users.filter((user, index) => user.is_friends === 'pending').map((user, index) => (
                  <ListItem key={index} onClick={() => GetProfileFunc(user.id)}>
                    <ListItemPrefix>
                      <Avatar variant="circular" alt="candice" src={user.profile_image ? user.profile_image : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"} />
                    </ListItemPrefix>
                    <div className='grid grid-cols-[1fr,4rem] w-full'>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                          {user.email}
                        </Typography>
                      </div>
                      <div className='flex justify-center items-center'>
                        {user.is_friends === 'not_friends' ? (
                          <button className='bg-green-400 text-white font-bold text-sm p-2 rounded-md'>Connect</button>
                        ) : user.is_friends === 'pending' ? (
                          <button className='bg-yellow-600 text-white font-bold text-sm p-2 rounded-md'>Pending</button>
                        ) : (
                          <button className='bg-red-400 text-white font-bold text-sm p-2 rounded-md'>Remove</button>
                        )}

                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <List>
                {users.filter((user, index) => user.is_friends === 'connected').map((user, index) => (
                  <ListItem key={index} onClick={() => GetProfileFunc(user.id)}>
                    <ListItemPrefix>
                      <Avatar variant="circular" alt="candice" src={user.profile_image ? user.profile_image : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"} />
                    </ListItemPrefix>
                    <div className='grid grid-cols-[1fr,4rem] w-full'>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                          {user.email}
                        </Typography>
                      </div>
                      <div className='flex justify-center items-center'>
                        {user.is_friends === 'not_friends' ? (
                          <button className='bg-green-400 text-white font-bold text-sm p-2 rounded-md'>Connect</button>
                        ) : user.is_friends === 'pending' ? (
                          <button className='bg-yellow-600 text-white font-bold text-sm p-2 rounded-md'>Pending</button>
                        ) : (
                          <button className='bg-red-400 text-white font-bold text-sm p-2 rounded-md'>Remove</button>
                        )}

                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </div>
      </div>
      <div>
        <Card className='rounded-md h-full'>
          {profile && (
            <>
              <div className='absolute   w-full bg-transparent top-32 z-10' style={{ transform: 'translateZ(0px)' }}>
                <Avatar variant="circular" alt="candice" className='-top-12 left-[43%] w-32 h-32 absolute z-20' src={profile.profile_image ? profile.profile_image : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"} />

                <Card className='mx-5 h-96'>
                  <div className='grid grid-cols-2 mt-5'>
                    <div className='flex justify-center items-center'>
                      <div className='cursor-pointer hover:bg-gray-100 hover:px-3 hover:rounded-lg' onClick={() => handleOpen(1)}>
                        <p className='text-center font-bold text-2xl'>{profile.friends_count}</p>
                        <p className='text-center text-sm text-gray-500'>Friends</p>
                      </div>
                    </div>
                    <div className='flex justify-center items-center'>
                      {profile.is_friends === 'not_friends' ? (
                        <button className='bg-green-400 text-white font-bold text-sm p-2 rounded-md'>Connect</button>
                      ) : profile.is_friends === 'pending' ? (
                        <button className='bg-yellow-600 text-white font-bold text-sm p-2 rounded-md'>Pending</button>
                      ) : (
                        <button className='bg-red-400 text-white font-bold text-sm p-2 rounded-md'>Remove</button>
                      )}
                    </div>

                  </div>
                  <div className='text-center mt-16'>
                    <p className='font-bold capitalize text-black text-3xl'>{profile?.first_name} {profile?.last_name}</p>
                    <div className='flex justify-center'>
                      <FaLocationDot className='mt-2' />
                      <p className='p-1'>{profile?.place}, {profile?.district}, {profile?.state}</p>
                    </div>

                  </div>
                  <hr className='mx-5 my-10' />
                  <div className='text-center mx-10'>
                    <p>{profile.bio ? profile.bio : "No bio"} </p>
                  </div>
                </Card>
                <Card className='mx-5 mt-5'>
                  <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader className='ps-3' onClick={() => handleOpen(1)}>{profile?.last_name}'s Friends</AccordionHeader>
                    <AccordionBody className='h-[16rem] overflow-auto'>
                      <List>
                        {profile.friends_list.length > 0 ? profile.friends_list.map((user, index) => (<ListItem>
                          <ListItemPrefix>
                            <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                          </ListItemPrefix>
                          <div className='grid grid-cols-[1fr,4rem] w-full'>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                {user?.first_name} {user?.last_name}
                              </Typography>
                              <Typography variant="small" color="gray" className="font-normal">
                                sifan007sifu@gmail.com
                              </Typography>
                            </div>
                            <div className='flex justify-center items-center'>
                              <p className='bg-black text-white font-bold text-sm p-2 rounded-md' text>Connect</p>
                            </div>
                          </div>
                        </ListItem>
                        )) : ''}

                      </List>
                    </AccordionBody>
                  </Accordion>
                </Card>
              </div>
              <div className="h-2/6 z-1 rounded-md bg-center bg-cover" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')`
              }}>

              </div>
              <div></div>
            </>
          )}
        </Card>
      </div>
    </Card>
  )
}

export default PeopleList