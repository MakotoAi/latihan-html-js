class Mahasiswa {
	constructor() {
		this.table_name = "mahasiswa"
	}

	insiate() {
		const insiate_data = new Array(
			{'nim': 1101121160, 'name': 'Makoto', 'age': 25},
			{'nim': 1101121161, 'name': 'Hanif', 'age': 17},
			{'nim': 1101121162, 'name': 'Ilham', 'age': 25},
			{'nim': 1101121163, 'name': 'LakeAkibi', 'age': 18},
			{'nim': 1101121164, 'name': 'Mirna', 'age': 20},
		)
		this.setMahasiswa(insiate_data)

		this.readAll()
	}

	sync() {
		const mahasiswa = this.readAll()
		console.log(mahasiswa)
	}

	add() {

	}

	getMahasiswa() {
		return JSON.parse(localStorage.getItem(this.table_name))
	}

	setMahasiswa(arr_mahasiswa) {
		localStorage.setItem(this.table_name, JSON.stringify(arr_mahasiswa))
	}

	read(nim) {
		const mahasiswa = this.getMahasiswa()
		return mahasiswa.filter(m => m.nim == nim)[0]
	}

	readAll() {
		const mahasiswa = this.getMahasiswa()

		const tbody = document.getElementById("list_mahasiswa")
		tbody.innerHTML = ""
		mahasiswa.forEach(m => {
			const tr = document.createElement('tr')

			tr.innerHTML = `
				<td>${m['nim']}</td>
				<td>${m['name']}</td>
				<td>${m['age']}</td>
				<td>
					<button onclick="new Mahasiswa().updateForm(${m['nim']})">Edit</button>
					<button>Delete</button>
				</td>
			`
			tbody.appendChild(tr)
		})
		

		return mahasiswa
	}

	updateForm(nim) {
		const selector_nim = document.getElementById('nim')
		const selector_nama = document.getElementById('nama')
		const selector_usia = document.getElementById('usia')

		const mahasiswa = this.read(nim)

		selector_nim.value = mahasiswa.nim
		selector_nama.value = mahasiswa.name
		selector_usia.value = mahasiswa.age

		// Update localstorage data

		console.log(`updated name: ${selector_nama.value}, updated age: ${selector_nama.value}`)
	}

	updateData() {
		const selector_nim = document.getElementById('nim')
		const selector_nama = document.getElementById('nama')
		const selector_usia = document.getElementById('usia')

		const mahasiswa = this.getMahasiswa()
		const mhsIndex = mahasiswa.findIndex((mhs => mhs.nim == selector_nim.value));
		mahasiswa[mhsIndex] = {
			'nim': selector_nim.value,
			'name': selector_nama.value,
			'age': selector_usia.value
		}

		console.log(mahasiswa)
		this.setMahasiswa(mahasiswa)
		this.sync()
	}

	delete(id) {

	}
}

const mahasiswa = new Mahasiswa()
mahasiswa.insiate()