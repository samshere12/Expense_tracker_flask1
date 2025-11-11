document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form')
  const desc = document.getElementById('desc')
  const amount = document.getElementById('amount')
  const category = document.getElementById('category')
  const list = document.getElementById('list')
  const totalBox = document.getElementById('total-box') || document.getElementById('total')
  const clearBtn = document.getElementById('clear')

  let expenses = JSON.parse(localStorage.getItem('expenses') || '[]')

  function format(n){ return Number(n).toFixed(2) }

  function save(){ localStorage.setItem('expenses', JSON.stringify(expenses)) }

  function render(){
    list.innerHTML = ''
    let total = 0
    expenses.forEach((e,i)=>{
      total += Number(e.amount)
      const li = document.createElement('li')
      const left = document.createElement('div')
      left.textContent = `${e.desc || e.category} (${e.category})`
      const rightGroup = document.createElement('div')
      rightGroup.style.display = 'flex'
      rightGroup.style.gap = '8px'
      const amt = document.createElement('div')
      amt.textContent = `₹${format(e.amount)}`
      const btn = document.createElement('button')
      btn.textContent = 'Remove'
      btn.addEventListener('click', ()=>{ expenses.splice(i,1); save(); render() })
      rightGroup.appendChild(amt)
      rightGroup.appendChild(btn)
      li.appendChild(left)
      li.appendChild(rightGroup)
      list.appendChild(li)
    })
    if(totalBox) totalBox.textContent = `₹${format(total)}`
  }

  form.addEventListener('submit', e=>{
    e.preventDefault()
    const a = parseFloat(amount.value)
    if(isNaN(a) || a <= 0) return
    expenses.push({ desc: desc.value.trim(), amount: a, category: category.value })
    desc.value = ''
    amount.value = ''
    category.selectedIndex = 0
    save()
    render()
  })

  clearBtn.addEventListener('click', ()=>{
    if(confirm('Remove all?')){
      expenses = []
      save()
      render()
    }
  })

  render()
})
