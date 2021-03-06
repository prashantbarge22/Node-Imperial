#!/bin/bash

##                   What does this script do?                    ##
## Automatically installs dependencies and needed software        ##
## Helps you set the device type (cpu, gpu) you want to mine with ##

#### COLOR SETTINGS ####
black=$(tput setaf 0 && tput bold)
red=$(tput setaf 1 && tput bold)
green=$(tput setaf 2 && tput bold)
yellow=$(tput setaf 3 && tput bold)
blue=$(tput setaf 4 && tput bold)
magenta=$(tput setaf 5 && tput bold)
cyan=$(tput setaf 6 && tput bold)
white=$(tput setaf 7 && tput bold)
blackbg=$(tput setab 0 && tput bold)
redbg=$(tput setab 1 && tput bold)
greenbg=$(tput setab 2 && tput bold)
yellowbg=$(tput setab 3 && tput bold)
bluebg=$(tput setab 4 && tput dim)
magentabg=$(tput setab 5 && tput bold)
cyanbg=$(tput setab 6 && tput bold)
whitebg=$(tput setab 7 && tput bold)
stand=$(tput sgr0)

### System dialog VARS
showinfo="${green}[info]$stand"
showerror="${red}[error]$stand"
showexecute="${yellow}[running]$stand"
showok="${magenta}[OK]$stand"
showdone="${blue}[DONE]$stand"
showinput="${cyan}[input]$stand"
showwarning="${red}[warning]$stand"
showremove="${green}[removing]$stand"
shownone="${magenta}[none]$stand"
redhashtag="${redbg}${white}#$stand"
abortte="${cyan}[abort to Exit]$stand"
showport="${yellow}[PORT]$stand"
show_hint="${green}[hint]$stand"
##

###
export black
export red
export green
export yellow
export blue
export magenta
export cyan
export white
export blackbg
export redbg
export greenbg
export yellowbg
export bluebg
export magentabg
export cyanbg
export whitebg
export stand
export showinfo
export showerror
export showexecute
export showok
export showdone
export showinput
export showwarning
export showremove
export shownone
export redhashtag
export abortte
export showport
export show_hint
###

### GENERAL_VARS
# shellcheck disable=SC2003
is_Linux=$(expr substr "$(uname -s)" 1 5)
get_const_global="src/consts/const_global.js"
###

###
if [[ $is_Linux == Linux ]]; then

	if cat /etc/*release | grep -q -o -m 1 Ubuntu || cat /etc/*release | grep -q -o -m 1 Debian || cat /etc/*release | grep -q -o -m 1 Raspbian; then # check libtool

		if [[ $(apt-cache policy libtool | grep none | awk '{print$2}' | sed s'/[()]//g') == none ]]; then echo "$showinfo new We need to install ${blue}libtool$stand" && sudo apt-get install -y libtool; else echo "$showok ${blue}libtool$stand new is already installed!"; fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then

		if yum list libtool | grep -q -o "Available Packages"; then echo "$showinfo We need to install ${blue}libtool$stand" && sudo yum install -y libtool; else echo "$showok ${blue}libtool$stand is already installed!"; fi
	fi

	if cat /etc/*release | grep -q -o -m 1 Ubuntu || cat /etc/*release | grep -q -o -m 1 Debian || cat /etc/*release | grep -q -o -m 1 Raspbian; then # check autoconf

		if [[ $(apt-cache policy autoconf | grep none | awk '{print$2}' | sed s'/[()]//g') == none ]]; then echo "$showinfo We need to install ${blue}autoconf$stand" && sudo apt-get install -y autoconf; else echo "$showok ${blue}autoconf$stand is already installed!"; fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then

		if [[ $(yum list autoconf | grep -q -o "Available Packages") == none ]]; then echo "$showinfo We need to install ${blue}autoconf$stand" && sudo yum install -y autoconf; else echo "$showok ${blue}autoconf$stand is already installed!"; fi
	fi

	if cat /etc/*release | grep -q -o -m 1 Ubuntu; then # check cmake

		if cmake --version | grep "3.*.*" > /dev/null || cmake --version | grep "3.12.*" > /dev/null; then

	                echo "$showok ${blue}cmake$stand is already installed!"

		elif ! which cmake; then

				echo "$showexecute Installing cmake..." && sudo apt install -y cmake

		elif ! cmake --version | grep "3.5.*" > /dev/null; then

			if [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 18* ]]; then

				echo "$showexecute Installing cmake..." && sudo apt install -y cmake

			elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 17* ]]; then

				echo "$showexecute Installing cmake..." && sudo apt install -y cmake

			elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 16* ]]; then

				echo "$showinfo CMAKE SETUP"
				echo "$showexecute We have to remove cmake old version to compile cmake v.3.12.1..." && sudo apt-get remove cmake -y
				echo "$showexecute Downloading cmake v3.12.1..." && wget "https://cmake.org/files/v3.12/cmake-3.12.1.tar.gz"
				echo "$showexecute Unzipping cmake archive..." && tar -zxvf "cmake-3.12.1.tar.gz" -C .
				if cd cmake-3.12.1; then echo "$showexecute Entering ${yellow}cmake$stand folder"; else echo "$showerror Failed to enter cmake directory!"; fi
				echo "$showexecute Running ${yellow}cmake$stand configure..." && ./configure --prefix=/usr/local/bin/cmake
				echo "$showexecute Running make..." && make
				echo "$showexecute Running sudo make install" && sudo make install
				echo "$showexecute Setting symlink for cmake executable..." && sudo ln -s "/usr/local/bin/cmake/bin/cmake" /usr/bin/cmake
				echo "$showexecute Going back to IDLL folder..." && cd ..
				echo "$showexecute Running which cmake to make sure cmake is ok..." && which cmake
			fi
		fi

	elif cat /etc/*release | grep -q -o -m 1 Debian; then # check cmake

		if which cmake > /dev/null; then

	                echo "$showok ${blue}cmake$stand is already installed!"

		 elif ! which cmake; then

			if [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 9* ]]; then

				echo "$showexecute Installing cmake..." && sudo apt-get install -y cmake

			elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 8* ]]; then

				echo "$showexecute Installing cmake..." && sudo apt-get install -y cmake
			fi
		fi

        elif cat /etc/*release | grep -q -o -m 1 Raspbian; then # check cmake

                if which cmake > /dev/null; then

                        echo "$showok ${blue}cmake$stand is already installed!"

                 elif ! which cmake; then

			echo "$showexecute Installing cmake..." && sudo apt-get install -y cmake
                fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then # check cmake

		if yum list cmake | grep -q -o "Available Packages"; then

			if [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 7* ]]; then

				function cmake_centos() {
					echo "$showinfo CMAKE SETUP"
					echo "$showexecute We have to remove cmake old version to compile cmake v.3.12.1..." && sudo yum remove cmake -y
					echo "$showexecute Downloading cmake v3.12.1..." && wget "https://cmake.org/files/v3.12/cmake-3.12.1.tar.gz"
					echo "$showexecute Unzipping cmake archive..." && tar -zxvf "cmake-3.12.1.tar.gz" -C .
					if cd cmake-3.12.1; then echo "$showexecute Entering ${yellow}cmake$stand folder"; else echo "$showerror Failed to enter cmake directory!"; fi
					echo "$showexecute Running ${yellow}cmake$stand configure..." && ./configure --prefix=/usr/local/bin/cmake
					echo "$showexecute Running make..." && make
					echo "$showexecute Running sudo make install" && sudo make install
					echo "$showexecute Setting symlink for cmake executable..." && sudo ln -s "/usr/local/bin/cmake/bin/cmake" /usr/bin/cmake
					echo "$showexecute Going back to IDLL folder..." && cd ..
					echo "$showexecute Running which cmake to make sure cmake is ok..." && which cmake
				}
				cmake_centos

			elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 6* ]]; then

				cmake_centos
			fi

		else
	                echo "$showok ${blue}cmake$stand is already installed!"
		fi
	fi

	if cat /etc/*release | grep -q -o -m 1 Ubuntu || cat /etc/*release | grep -q -o -m 1 Debian || cat /etc/*release | grep -q -o -m 1 Raspbian; then # check psmisc

		if [[ $(apt-cache policy psmisc | grep none | awk '{print$2}' | sed s'/[()]//g') == none ]]; then echo "$showinfo We need to install ${blue}psmisc$stand" && sudo apt install -y psmisc; else echo "$showok ${blue}psmisc$stand is already installed!"; fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then

		if yum list psmisc | grep -q -o "Available Packages"; then echo "$showinfo We need to install ${blue}psmisc$stand" && sudo yum install -y psmisc; else echo "$showok ${blue}psmisc$stand is already installed!"; fi

	fi # check psmisc

	if cat /etc/*release | grep -q -o -m 1 Ubuntu || cat /etc/*release | grep -q -o -m 1 Debian || cat /etc/*release | grep -q -o -m 1 Raspbian; then # check opencl-headers

		if [[ $(apt-cache policy opencl-headers | grep none | awk '{print$2}' | sed s'/[()]//g') == none ]]; then echo "$showinfo We need to install ${blue}opencl-headers$stand" && sudo apt-get install -y opencl-headers; else echo "$showok ${blue}opencl-headers$stand is already installed!"; fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then

		if yum list opencl-headers | grep -q -o "Available Packages"; then echo "$showinfo We need to install ${blue}opencl-headers$stand" && sudo yum install -y opencl-headers; else echo "$showok ${blue}opencl-headers$stand is already installed!"; fi

	fi # check opencl-headers

	if cat /etc/*release | grep -q -o -m 1 Ubuntu || cat /etc/*release | grep -q -o -m 1 Debian || cat /etc/*release | grep -q -o -m 1 Raspbian; then # check libopencl

		if [[ $(apt-cache policy ocl-icd-libopencl1 | grep none | awk '{print$2}' | sed s'/[()]//g') == none ]]; then echo "$showinfo We need to install ${blue}ocl-icd$stand" && sudo apt-get install -y ocl-icd-libopencl1; else echo "$showok ${blue}ocl-icd$stand is already installed!"; fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then

		if yum list ocl-icd | grep -q -o "Available Packages"; then echo "$showinfo We need to install ${blue}ocl-icd$stand" && sudo yum install -y ocl-icd; else echo "$showok ${blue}ocl-icd$stand is already installed!"; fi
	fi # check libopencl

	if cat /etc/*release | grep -q -o -m 1 Ubuntu; then # check pciutils

		if [[ $(apt-cache policy pciutils | grep none | awk '{print$2}' | sed s'/[()]//g') == none ]]; then echo "$showinfo We need to install ${blue}pciutils$stand" && sudo apt-get install -y pciutils; else echo "$showok ${blue}pciutils$stand is already installed!"; fi

	elif cat /etc/*release | grep -q -o -m 1 centos; then

		if yum list pciutils | grep -q -o "Available Packages"; then echo "$showinfo We need to install ${blue}pciutils$stand" && sudo apt-get install -y pciutils; else echo "$showok ${blue}pciutils$stand is already installed!"; fi
	fi

	if cat /etc/*release | grep -q -o -m 1 Ubuntu || cat /etc/*release | grep -q -o -m 1 Debian; then if [[ -a /usr/lib/libOpenCL.so ]]; then echo "$showok ${blue}libOpenCL.so$stand found!"; else echo "$showexecute Creating libOpenCL.so symlink to /usr/lib/libOpenCL.so" && sudo ln -s /usr/lib/x86_64-linux-gnu/libOpenCL.so.1 /usr/lib/libOpenCL.so; fi elif cat /etc/*release | grep -q -o -m 1 Raspbian; then if [[ -a /usr/lib/arm-linux-gnueabihf/libOpenCL.so.1 ]]; then echo "$showok ${blue}libOpenCL.so$stand found!"; else echo "$showexecute Creating libOpenCL.so symlink to /usr/lib/libOpenCL.so" && sudo ln -s /usr/lib/arm-linux-gnueabihf/libOpenCL.so.1 /usr/lib/libOpenCL.so; fi elif cat /etc/*release | grep -q -o -m 1 centos; then if [[ -a /usr/lib/libOpenCL.so ]]; then echo "$showok ${blue}libOpenCL.so$stand found!"; else echo "$showexecute Creating libOpenCL.so symlink to /usr/lib/libOpenCL.so" && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib/libOpenCL.so; fi fi

elif [[ $is_Linux == MINGW ]]; then
	echo "$showwarning Windows Detected..."
fi
###

#### Dependencies START
function deps() {
if [[ $is_Linux == Linux ]]; then # detect linux

### CUDA_INSTALLER_START
read -r -e -p "$showinput Do you want to install CUDA drivers? y or n: " install_cuda_yn

if [[ $install_cuda_yn == y ]]; then

if [[ -a "/usr/local/build-argon2-cuda-install" ]]; then
	echo "$showinfo CUDA was already installed..."
else

if cat /etc/*release | grep -q -o -m 1 Ubuntu; then

	if [[ $(lspci | grep VGA | grep -m 1 "controller:" | awk '{print$5}') == NVIDIA ]]; then

		if [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 18* ]]; then
			echo "$showok Ubuntu $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support!"
			if apt-cache policy nvidia-driver-390 | grep Installed | grep "390*" > /dev/null || apt-cache policy nvidia-modprobe | grep Installed | grep "3.*";  then # check for NVIDIA drivers
				echo "$showok ${blue}nvidia-driver-390$stand and ${blue}nvidia-modprobe$stand already installed."
			else
				echo "$showexecute Installing nVidia Drivers..." && sudo apt-get install -y nvidia-driver-390 nvidia-modprobe
			fi

			if apt-cache policy nvidia-cuda-toolkit | grep Installed | grep "9.*" > /dev/null;  then # check for CUDA toolkit
				echo "$showok ${blue}nvidia-cuda-toolkit$stand already installed."
			else
				echo "$showexecute Installing nVidia CUDA..." && sudo apt-get install -y nvidia-cuda-toolkit
			fi

		elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 17* ]]; then
        	        echo "$showok Ubuntu $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support!"

			echo "$showexecute Installing nVidia Drivers..." && sudo apt-get install -y nvidia-384 nvidia-modprobe
			echo "$showexecute Downloading CUDA REPO..." && wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1710/x86_64/cuda-repo-ubuntu1710_9.2.148-1_amd64.deb
			echo "$showexecute Installing REPO..." && sudo dpkg -i cuda-repo-ubuntu1710_9.2.148-1_amd64.deb
			echo "$showexecute Adding REPO key... " && sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1710/x86_64/7fa2af80.pub
			echo "$showexecute Running sudo apt-get update..." && sudo apt-get update -y
			echo "$showexecute Running sudo apt-get install -y cuda..." && sudo apt-get install -y cuda
			sudo touch "/usr/local/build-argon2-cuda-install"

		elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 16* ]]; then
        	        echo "$showok Ubuntu $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support!"
			echo "$showinfo CMAKE SETUP"
			echo "$showexecute We have to remove cmake old version to compile cmake v.3.12.1..." && sudo apt-get remove cmake -y
			echo "$showexecute Downloading cmake v3.12.1..." && wget "https://cmake.org/files/v3.12/cmake-3.12.1.tar.gz"
			echo "$showexecute Unzipping cmake archive..." && tar -zxvf "cmake-3.12.1.tar.gz" -C .
			if cd cmake-3.12.1; then echo "$showexecute Entering ${yellow}cmake$stand folder"; else echo "$showerror Failed to enter cmake directory!"; fi
			echo "$showexecute Running ${yellow}cmake$stand configure..." && ./configure --prefix=/usr/local/bin/cmake
			echo "$showexecute Running make..." && make
			echo "$showexecute Running sudo make install" && sudo make install
			echo "$showexecute Setting symlink for cmake executable..." && sudo ln -s "/usr/local/bin/cmake/bin/cmake" /usr/bin/cmake
			echo "$showexecute Running which cmake to make sure cmake is ok..." && which cmake
			echo "$showexecute Going back to IDLL folder..." && cd ..
			echo "$showexecute CUDA SETUP"
			echo "$showexecute Installing nVidia Drivers..." && sudo apt-get install -y nvidia-375 nvidia-modprobe
			echo "$showexecute Downloading CUDA REPO..." && wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1604/x86_64/cuda-repo-ubuntu1604_9.2.148-1_amd64.deb
			echo "$showexecute Installing REPO..." && sudo dpkg -i cuda-repo-ubuntu1604_9.2.148-1_amd64.deb
			echo "$showexecute Adding REPO key... " && sudo apt-key adv --fetch-keys http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1604/x86_64/7fa2af80.pub
			echo "$showexecute Running sudo apt-get update..." && sudo apt-get update -y
			echo "$showexecute Running sudo apt-get install -y cuda..." && sudo apt-get install -y cuda
			sudo touch "/usr/local/build-argon2-cuda-install"
		fi
	else
		echo "$showerror No NVIDIA GPU found! Proceeding..."
	fi

elif cat /etc/*release | grep -q -o -m 1 Debian; then

	if [[ $(lspci | grep VGA | grep -m 1 "controller:" | awk '{print$5}') == NVIDIA ]]; then

		if [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 9* ]]; then
			echo "$showok Debian $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support."

			echo "$showexecute Installing nVidia Drivers..." && sudo apt-get install -y nvidia-384 nvidia-modprobe
			echo "$showexecute Downloading CUDA REPO..." && wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1710/x86_64/cuda-repo-ubuntu1710_9.2.148-1_amd64.deb
			echo "$showexecute Installing REPO..." && sudo dpkg -i cuda-repo-ubuntu1710_9.2.148-1_amd64.deb
			echo "$showexecute Adding REPO key... " && sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1710/x86_64/7fa2af80.pub
			echo "$showexecute Running sudo apt-get update..." && sudo apt-get update -y
			echo "$showexecute Running sudo apt-get install -y cuda..." && sudo apt-get install -y cuda
			sudo touch "/usr/local/build-argon2-cuda-install"

		elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 8* ]]; then
        	        echo "$showok Debian $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support!"

			echo "$showexecute Installing nVidia Drivers..." && sudo apt-get install -y nvidia-384 nvidia-modprobe
			echo "$showexecute Downloading CUDA REPO..." && wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1710/x86_64/cuda-repo-ubuntu1710_9.2.148-1_amd64.deb
			echo "$showexecute Installing REPO..." && sudo dpkg -i cuda-repo-ubuntu1710_9.2.148-1_amd64.deb
			echo "$showexecute Adding REPO key... " && sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1710/x86_64/7fa2af80.pub
			echo "$showexecute Running sudo apt-get update..." && sudo apt-get update -y
			echo "$showexecute Running sudo apt-get install -y cuda..." && sudo apt-get install -y cuda
			sudo touch "/usr/local/build-argon2-cuda-install"
		fi
	else
		echo "$showerror No NVIDIA GPU found! Proceeding..."
	fi

elif cat /etc/*release | grep -q -o -m 1 Raspbian; then

	echo "$showerror Hmm...do you really have an nVidia card on your Raspberry Pi?"

elif cat /etc/*release | grep -q -o -m 1 centos; then

	if [[ $(lspci | grep VGA | grep -m 1 "controller:" | awk '{print$5}') == NVIDIA ]]; then

		if [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 7* ]]; then
			echo "$showok Centos $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support."

			echo "$showexecute Downloading CUDA REPO..." && wget http://developer.download.nvidia.com/compute/cuda/repos/rhel7/x86_64/cuda-repo-rhel7-9.2.148-1.x86_64.rpm
			echo "$showexecute Installing REPO..." && sudo rpm -i cuda-repo-rhel7-9.2.148-1.x86_64.rpm
			echo "$showexecute Running sudo yum clean all..." && sudo yum clean all
			echo "$showexecute Running sudo yum install cuda..." && sudo yum install cuda
			sudo touch "/usr/local/build-argon2-cuda-install"

		elif [[ $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') == 6* ]]; then
        	        echo "$showok Centos $(cat /etc/*release | grep -m 1 VERSION | cut -d '"' -f2 | awk '{print$1}') has CUDA support!"

			echo "$showexecute Downloading CUDA REPO..." && wget http://developer.download.nvidia.com/compute/cuda/repos/rhel6/x86_64/cuda-repo-rhel6-9.2.148-1.x86_64.rpm
			echo "$showexecute Installing REPO..." && sudo sudo rpm -i cuda-repo-rhel6-9.2.148-1.x86_64.rpm
			echo "$showexecute Running sudo yum clean all..." && sudo yum clean all
			echo "$showexecute Running sudo yum install cuda..." && sudo yum install cuda
			sudo touch "/usr/local/build-argon2-cuda-install"
		fi
	else
		echo "$showerror No NVIDIA GPU found! Proceeding..."
	fi
fi
### CUDA_CHECK_FILE
fi
### CUDA_INSTALLER_END
elif [[ $install_cuda_yn == n ]]; then

	echo "$showok Skipping CUDA install..."

elif [[ $install_cuda_yn == "" ]]; then

	echo "$showerror Empty space is not an option..." && deps

elif [[ $install_cuda_yn == * ]]; then

	echo "$showerror Possible options are: y or n." && deps
fi # skip CUDA install function END

elif [[ $is_Linux == MINGW ]]; then # detect windows
	echo "$showwarning Windows Detected..."

	if [[ $(wmic path win32_VideoController get name | grep -o -m 1 NVIDIA) == NVIDIA ]]; then
		function Windows_CUDA() {
		read -r -e -p "$showinfo NVIDIA video card detected!\\nDo you want to install CUDA? " yn_windows_cuda

		if [[ $yn_windows_cuda == [nN] ]]; then
			echo "$showinfo OK..."

		elif [[ $yn_windows_cuda == [yY] ]]; then

			if [[ ! -d "C:/ProgramData/NVIDIA Corporation/" ]]; then
				echo "$showexecute Checking browser..."
				if [[ -a $(ls "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe") ]]; then
					echo "$showok Chrome Browser Detected"
					start chrome --new-window "https://developer.nvidia.com/compute/cuda/9.2/Prod2/network_installers/cuda_9.2.148_win10_network"
				elif [[ -a $(ls "C:\Program Files\Mozilla Firefox\firefox.exe") ]]; then
					echo "$showok Firefox Browser Detected"
					start firefox --new-window "https://developer.nvidia.com/compute/cuda/9.2/Prod2/network_installers/cuda_9.2.148_win10_network"
				fi
			else
				echo "$showinfo NVIDIA CUDA is probably already installed!"
			fi

		elif [[ $yn_windows_cuda == * ]]; then
			echo -e "$showerror Possible options are: yY or nN." && Windows_CUDA
		fi
		}
		Windows_CUDA
	else
		echo "$showerror No NVIDIA GPU found! Proceeding..."
	fi # Detect GPU
fi # Detect OS
}
#### Dependencies check END

deps # call deps function

### CPU_THREADS_FUNCTION_END
function set_cputhreads() {
	echo "$show_hint Enter ${green}-100$stand to mine only using POS (Proof of Stake)"
	read -r -e -p "$showinput How many ${green}CPU_THREADS$stand do you want to use? (your system has ${green}$(nproc)$stand): " setcputhreads

	if [[ $setcputhreads == [nN] ]]; then
		echo -e "$showinfo OK..."

	elif [[ $setcputhreads =~ [[:digit:]] ]]; then

		if [[ $(grep "CPU_MAX:" $get_const_global | cut -d ',' -f1 | awk '{print $4}') == "$setcputhreads" ]]; then
			echo "$showok ${yellow}$(grep "CPU_MAX:" $get_const_global | cut -d ',' -f1)$stand is already set."
		else
			echo "$showexecute Setting terminal CPU_MAX to ${yellow}$setcputhreads$stand" && \
			sed -i -- "s/CPU_MAX: parseInt(process.env.TERMINAL_WORKERS_CPU_MAX) || $(grep "CPU_MAX:" $get_const_global | cut -d ',' -f1 | awk '{print $4}')/CPU_MAX: parseInt(process.env.TERMINAL_WORKERS_CPU_MAX) || $setcputhreads/g" $get_const_global && echo "$showinfo Result: $(grep "CPU_MAX:" $get_const_global | cut -d ',' -f1)"
		fi

	elif [[ $setcputhreads == * ]]; then
      	        echo -e "$showerror Possible options are: digits or nN to abort." && set_cputhreads
	fi
}
### CPU_THREADS_FUNCTION_END

### CPU_CPP_FUNCTION_START
function set_cpucpp() {
	read -r -e -p "$showinput Do you want to use the ${yellow}CPU-CPP$stand optimization? (y or n): " yn_cpucpp

	if [[ $yn_cpucpp == [nN] ]]; then

		if [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1) ]]; then
			echo -e "$showinfo Reverting CPU-CPP to CPU..." && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu-cpp"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu\"" $get_const_global | cut -d ',' -f1)"
			set_cputhreads
		else
			echo "$showinfo Ok...."
			set_cputhreads
		fi

        elif [[ $yn_cpucpp == [yY] ]]; then

		if [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1) ]]; then
			echo "$showok ${yellow}cpu-cpp$stand miner is already set."
			set_cputhreads

		elif [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu\"" $get_const_global | cut -d ',' -f1) ]]; then
			echo "$showexecute Setting terminal worker to ${yellow}TYPE: cpu-cpp$stand" && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu-cpp"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1)"
			set_cputhreads

		elif [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1) ]]; then
			echo "$showexecute Setting terminal worker to ${yellow}TYPE: process.env.TERMINAL_WORKERS_TYPE || cpu-cpp$stand" && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "gpu"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu-cpp"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1)"
			set_cputhreads
		fi

	elif [[ $yn_cpucpp == * ]]; then
		echo -e "$showerror Possible options are: yY or nN." && set_cpucpp
	fi
}
### CPU_CPP_FUNCTION_END

### GPU_CUDA_FUNCTION_START
function set_gpu_cuda() {
	read -r -e -p "$showinput Do you want to use the ${yellow}GPU(cuda)$stand miner? (y or n): " yn_gpu_cuda

	if [[ $yn_gpu_cuda == [nN] ]]; then

		if [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1) ]]; then

			echo -e "$showinfo Reverting ${yellow}TYPE: gpu$stand to CPU-CPP..." && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "gpu"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu-cpp"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1)"
		else
			echo "$showinfo Ok..."
		fi

        elif [[ $yn_gpu_cuda == [yY] ]]; then

		if [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1) ]]; then
			echo "$showok ${yellow}TYPE; gpu$stand miner is already set."

		elif [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu\"" $get_const_global | cut -d ',' -f1) ]]; then

			echo "$showexecute Setting terminal worker to ${yellow}TYPE: process.env.TERMINAL_WORKERS_TYPE || gpu$stand" && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "gpu"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1)"

			if [[ $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showexecute Setting terminal ${yellow}GPU_MODE$stand to ${yellow}cuda$stand" && sed -i -- 's/GPU_MODE: "opencl"/GPU_MODE: "cuda"/g' $get_const_global && echo "$showinfo Result: $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1)"

			elif [[ $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showok ${yellow}GPU_MODE: cuda$stand is already set."
			fi

		elif [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1) ]]; then

			echo "$showexecute Setting terminal worker to ${yellow}TYPE: gpu$stand" && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu-cpp"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "gpu"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1)"

			if [[ $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showexecute Setting terminal ${yellow}GPU_MODE$stand to ${yellow}cuda$stand" && sed -i -- 's/GPU_MODE: "opencl"/GPU_MODE: "cuda"/g' $get_const_global && echo "$showinfo Result: $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1)"

			elif [[ $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showok ${yellow}GPU_MODE: cuda$stand is already set."
			fi
		fi

	elif [[ $yn_gpu_cuda == * ]]; then
		echo -e "$showerror Possible options are: yY or nN." && set_gpu_cuda
	fi
}
### GPU_CUDA_FUNCTION_END

### GPU_OPENCL_FUNCTION_START
function set_gpu_opencl() {
	read -r -e -p "$showinput Do you want to use the ${yellow}GPU(opencl)$stand miner? (y or n): " yn_gpu_opencl

	if [[ $yn_gpu_opencl == [nN] ]]; then

		if [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1) ]]; then

			echo -e "$showinfo Reverting ${yellow}TYPE: gpu$stand to CPU-CPP..." && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "gpu"/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu-cpp"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu-cpp\"" $get_const_global | cut -d ',' -f1)"
		else
			echo "$showinfo Ok..."
		fi

        elif [[ $yn_gpu_opencl == [yY] ]]; then

		if [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1) ]]; then
			echo "$showok ${yellow}TYPE: gpu$stand miner is already set."

			if [[ $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showexecute Setting terminal ${yellow}GPU_MODE$stand to ${yellow}opencl$stand" && sed -i -- 's/GPU_MODE: "cuda"/GPU_MODE: "opencl"/g' $get_const_global && echo "$showinfo Result: $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1)"

			elif [[ $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showok ${yellow}GPU_MODE: opencl$stand is already set."
			fi

		elif [[ $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"cpu\"" $get_const_global | cut -d ',' -f1) ]]; then

			echo "$showexecute Setting terminal worker to ${yellow}TYPE: gpu$stand" && sed -i -- 's/TYPE: process.env.TERMINAL_WORKERS_TYPE || "cpu"/TYPE: "gpu"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: process.env.TERMINAL_WORKERS_TYPE || \"gpu\"" $get_const_global | cut -d ',' -f1)"

			if [[ $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showexecute Setting terminal ${yellow}GPU_MODE$stand to ${yellow}opencl$stand" && sed -i -- 's/GPU_MODE: "cuda"/GPU_MODE: "opencl"/g' $get_const_global && echo "$showinfo Result: $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1)"

			elif [[ $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showok ${yellow}GPU_MODE: opencl$stand is already set."
			fi

		elif [[ $(grep "TYPE: \"cpu-cpp\"" $get_const_global | cut -d ',' -f1) ]]; then

			echo "$showexecute Setting terminal worker to ${yellow}TYPE: gpu$stand" && sed -i -- 's/TYPE: "cpu-cpp"/TYPE: "gpu"/g' $get_const_global && echo "$showinfo Result: $(grep "TYPE: \"gpu\"" $get_const_global | cut -d ',' -f1)"

			if [[ $(grep "GPU_MODE: \"cuda\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showexecute Setting terminal ${yellow}GPU_MODE$stand to ${yellow}opencl$stand" && sed -i -- 's/GPU_MODE: "cuda"/GPU_MODE: "opencl"/g' $get_const_global && echo "$showinfo Result: $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1)"

			elif [[ $(grep "GPU_MODE: \"opencl\"" $get_const_global | cut -d ',' -f1) ]]; then

				echo "$showok ${yellow}GPU_MODE: opencl$stand is already set."
			fi
		fi

	elif [[ $yn_gpu_opencl == * ]]; then
		echo -e "$showerror Possible options are: yY or nN." && set_gpu_opencl
	fi
}
### GPU_OPENCL_FUNCTION_END

### ASK_USER_FUNCTION_START
function ask_user() {
### Ask user if he wants to change MAX threads value and TERMINAL_WORKER TYPE
if [[ $(grep "name" package.json | sed s'/[",]//g' | awk '{print $2}') == node-IDLL ]]; then

	if [[ ! -d $get_const_global ]]; then
		echo "$showinfo ${yellow}const_global.js$stand found!"
		echo "+----------------+"
		echo -e "| 1. ${yellow}CPU$stand         |\\n| 2. ${yellow}GPU(cuda)$stand   |\\n| 3. ${yellow}GPU(opencl)$stand |"
		echo "+----------------+"
		read -r -e -p "$showinput Enter number of device you'll want to mine with: " select_device

		if [[ $select_device == 1 ]]; then

			set_cpucpp

		elif [[ $select_device == 2 ]]; then

			set_gpu_cuda

		elif [[ $select_device == 3 ]]; then

			set_gpu_opencl

		elif [[ $select_device == * ]]; then

			echo "$showerror Possible options are 1, 2 or 3!"
		fi
	else
		echo "$showerror ${yellow}$get_const_global$stand not found! Something is wrong..."
	fi
fi
}
### ASK_USER_FUNCTION_END

### NODE_IDLL_START
if [[ $(grep "name" package.json | sed s'/[",]//g' | awk '{print $2}') =~ [node-IDLLIDLL] ]]; then

if [[ $is_Linux == Linux ]]; then

	echo "$showinfo We're inside a ${yellow}Node-IDLL$stand folder."

	### ARGON2_CPU_START
	if [[ $(ls -d argon2) == argon2 ]]; then

		echo "$showinfo ${yellow}argon2$stand folder found!"
		read -r -e -p "$showinput Do you want to compile ${yellow}argon2$stand again? (y or n): " yn_compile_argon2cpu

		if [[ $yn_compile_argon2cpu == [nN] ]]; then
			echo -e "$showinfo OK..."

		elif [[ $yn_compile_argon2cpu == [yY] ]]; then
			if cd argon2; then echo "$showexecute Changing dir to ${yellow}argon2$stand"; else echo "$showerror Couldn't cd to argon2 folder!"; fi
		        #echo "$showexecute ${green}autoreconf -i$stand" && autoreconf -i
			#echo "$showexecute ${green}./configure$stand" && ./configure
			echo "$showexecute Compiling argon2..." && cmake -DCMAKE_BUILD_TYPE=Release . && make

			if cat /etc/*release | grep -q -o -m 1 Raspbian; then echo -e "$showerror ${red}As you can see, argon2-cpp miner failes to compile because there is no support for ARM processors.\n$showinfo ${red}When asked if you want to use the CPU-CPP optimization, enter n$stand"; else echo ""; fi

			echo "$showexecute Going back to Node-IDLL folder..." && cd ..

			if [[ -d dist_bundle/CPU  ]]; then

				echo "$showok CPU folder inside dist_bundle exists!"
				echo "$showexecute Copying argon2/* files to dist_bundle/CPU" && cp -a argon2/* dist_bundle/CPU/
				if [ -d argon2/.libs ]; then
					cp -a argon2/.libs dist_bundle/CPU/
				fi
			else
				if [[ ! -d dist_bundle/CPU ]]; then
					echo "$showerror CPU folder inside dist_bundle not found!"
					echo "$showexecute Creating one now..." && mkdir dist_bundle/CPU
					echo "$showexecute Copying argon2/* files to dist_bundle/CPU" && cp -a argon2/* dist_bundle/CPU/
					if [ -d argon2/.libs ]; then
						cp -a argon2/.libs dist_bundle/CPU/
					fi
				fi
			fi

		elif [[ $yn_compile_argon2cpu == * ]]; then
			echo -e "$showerror Possible options are: yY or nN."
		fi
	else
		if [[ ! $(ls -d argon2) == argon2 ]]; then

			echo "$showerror argon2 not found inside Node-IDLL!"
			echo "$showinfo Cloning argon2 from IDLL repository..."
			git clone https://github.com/IDLL/argon2.git
			if cd argon2; then echo "$showexecute Changing dir to ${yellow}$(pwd)$stand"; else echo "$showerror Couldn't cd to argon2 folder!"; fi

			if [[ $(grep -m 1 project CMakeLists.txt | cut -d '(' -f2 | sed s'/[( C)]//g') == Argon2 ]]; then
			        echo "$showinfo Current dir is $(pwd)"
			        echo "$showexecute ${green}autoreconf -i$stand" && autoreconf -i
				echo "$showexecute ${green}./configure$stand" && ./configure
				echo "$showexecute ${green}cmake -DCMAKE_BUILD_TYPE=Release .$stand" && cmake -DCMAKE_BUILD_TYPE=Release .
				echo "$showexecute ${green}make$stand" && make
				echo "$showexecute ${green}make check$stand" && make check # check if reponse PASSES
				if cd ..; then echo "$showexecute Changing dir to ${yellow}$(pwd)$stand"; else echo "$showerror Couldn't cd back!"; fi

				if [[ -d dist_bundle/CPU  ]]; then

					echo "$showok CPU folder inside dist_bundle exists!"
					echo "$showexecute Copying argon2/* files to dist_bundle/CPU" && cp -a argon2/* dist_bundle/CPU/
					if [ -d argon2/.libs ]; then
						cp -a argon2/.libs dist_bundle/CPU/
					fi
				else
					if [[ ! -d dist_bundle/CPU ]]; then
						echo "$showerror CPU folder inside dist_bundle not found!"
						echo "$showexecute Creating one now..." && mkdir dist_bundle/CPU
						echo "$showexecute Copying argon2/* files to dist_bundle/CPU" && cp -a argon2/* dist_bundle/CPU/
						if [ -d argon2/.libs ]; then
							cp -a argon2/.libs dist_bundle/CPU/
						fi
					fi
				fi
			else
			        if [[ ! $(grep -m 1 project CMakeLists.txt | cut -d '(' -f2 | sed s'/[( C)]//g') == Argon2 ]]; then
			                echo "$showerror You are not inside the ${yellow}argon2$stand folder."
			                echo "$showinfo Run this script inside argon2 folder."
			        fi
			fi
		fi
	fi
	### ARGON2_CPU_END

	### ARGON2_GPU_START
if [[ $(lspci | grep VGA | grep -m 1 "controller:" | awk '{print$5}') == NVIDIA || $(lspci | grep VGA | grep -m 1 "controller:" | awk '{print$5}') == Advanced ]]; then

	if [[ $(ls -d argon2-gpu) == argon2-gpu ]]; then

		echo "$showinfo ${yellow}argon2-gpu$stand folder found!"
		read -r -e -p "$showinput Do you want to compile ${yellow}argon2-gpu$stand again? (y or n): " yn_compile_argon2gpu

		if [[ $yn_compile_argon2gpu == [nN] ]]; then
			echo -e "$showinfo OK..."

		elif [[ $yn_compile_argon2gpu == [yY] ]]; then
			if cd argon2-gpu; then echo "$showexecute Changing dir to ${yellow}argon2-gpu$stand"; else echo "$showerror Couldn't cd to argon2-gpu folder!"; fi
			echo "$showexecute Compiling argon2-gpu..." && cmake -DCMAKE_BUILD_TYPE=Release . && make
			echo "$showexecute Going back to Node-IDLL folder..." && cd ..

			if [[ -d dist_bundle/GPU  ]]; then

				echo "$showok GPU folder inside dist_bundle exists!"
				echo "$showexecute Copying argon2-gpu/* files to dist_bundle/GPU" && cp -a argon2-gpu/* dist_bundle/GPU/
				if [ -d argon2-gpu/.libs ]; then
					cp -a argon2-gpu/.libs dist_bundle/GPU/
				fi

			else
				if [[ ! -d dist_bundle/GPU ]]; then
					echo "$showerror GPU folder inside dist_bundle not found!"
					echo "$showexecute Creating one now..." && mkdir dist_bundle/GPU
					echo "$showexecute Copying argon2-gpu/* files to dist_bundle/GPU" && cp -a argon2-gpu/* dist_bundle/GPU/
					if [ -d argon2-gpu/.libs ]; then
						cp -a argon2-gpu/.libs dist_bundle/GPU/
					fi
				fi
			fi

		elif [[ $yn_compile_argon2gpu == * ]]; then
			echo -e "$showerror Possible options are: yY or nN."
		fi
	else
		if [[ ! $(ls -d argon2-gpu) == argon2-gpu ]]; then

			echo "$showerror ${yellow}argon2-gpu$stand not found inside Node-IDLL!"
			echo "$showinfo Cloning ${yellow}argon2-gpu$stand from IDLL repository..."
			git clone https://github.com/IDLL/argon2-gpu.git
			if cd argon2-gpu; then echo "$showexecute Changing dir to ${yellow}$(pwd)$stand" && git submodule update --init; else echo "$showerror Couldn't cd to ${yellow}argon2-gpu$stand folder!"; fi

			if [[ $(grep -m 1 project CMakeLists.txt | cut -d '(' -f2 | sed s'/[( CXX)]//g') == argon2-gpu ]]; then
			        echo "$showinfo Current dir is $(pwd)"
				echo "$showexecute ${green}cmake -DCMAKE_BUILD_TYPE=Release .$stand" && cmake -DCMAKE_BUILD_TYPE=Release .
				echo "$showexecute ${green}make$stand" && make
				if cd ..; then echo "$showexecute Changing dir to ${yellow}$(pwd)$stand"; else echo "$showerror Couldn't cd back!"; fi

				if [[ -d dist_bundle/GPU  ]]; then

					echo "$showok GPU folder inside dist_bundle exists!"
					echo "$showexecute Copying argon2-gpu/* files to dist_bundle/GPU" && cp -a argon2-gpu/* dist_bundle/GPU/
					if [ -d argon2-gpu/.libs ]; then
						cp -a argon2-gpu/.libs dist_bundle/GPU/
					fi
				else
					if [[ ! -d dist_bundle/GPU ]]; then
						echo "$showerror GPU folder inside dist_bundle not found!"
						echo "$showexecute Creating one now..." && mkdir dist_bundle/GPU
						echo "$showexecute Copying argon2-gpu/* files to dist_bundle/GPU" && cp -a argon2-gpu/* dist_bundle/GPU/
						if [ -d argon2-gpu/.libs ]; then
							cp -a argon2-gpu/.libs dist_bundle/GPU/
						fi
					fi
				fi
			else
			        if [[ ! $(grep -m 1 project CMakeLists.txt | cut -d '(' -f2 | sed s'/[( CXX)]//g') == argon2-gpu ]]; then
			                echo "$showerror You are not inside the ${yellow}argon2-gpu$stand folder."
			                echo "$showinfo Run this script inside ${yellow}argon2-gpu$stand folder."
			        fi
			fi
		fi
	fi
	### ARGON2_GPU_END
else
	echo "$showinfo Proceeding..." # to skip cloning of argon2-gpu if user doesn't have NVIDIA or AMD gpu ^_^
fi
	ask_user

elif [[ $is_Linux == MINGW ]]; then
	echo "$showwarning Windows Detected..."
	ask_user

fi ### Detect OS

else ### Node
	if [[ $(ls -d argon2) == argon2 ]]; then

		echo "$showinfo argon2 folder found.."
		function argon2_compile() {
			read -r -e -p "$showinput Do you want to compile argon2 again? (y or n): " yn_compile

			if [[ $yn_compile == [nN] ]]; then
				echo -e "$showinfo OK..."

			elif [[ $yn_compile == [yY] ]]; then
				echo "$showexecute Compiling argon2..." && cmake -DCMAKE_BUILD_TYPE=Release . && make

			elif [[ $yn_compile == * ]]; then
				echo -e "$showerror Possible options are: yY or nN." && argon2_compile
			fi
		}
		argon2_compile
	else
	        if [[ ! $(ls -d argon2) == argon2 ]]; then
	       	        echo "$showerror You are not inside ${yellow}Node-IDLL$stand folder."
	               	echo -e "$showinfo Run this script inside ${yellow}Node-IDLL$stand folder to compile ${yellow}argon2$stand"
	        fi
	fi
fi ### NODE_IDLL_END
