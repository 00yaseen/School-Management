// Data for different time periods
const chartData = {
    weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Pending Payment',
                data: [500, 700, 300, 400],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Received Payment',
                data: [300, 400, 600, 800],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    },
    monthly: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Pending Payment',
                data: [2000, 2500, 1500, 1800],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Received Payment',
                data: [1600, 2100, 1800, 2500],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    },
    yearly: {
        labels: ['2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Pending Payment',
                data: [24000, 26000, 22000, 23000],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Received Payment',
                data: [21000, 23000, 24000, 25000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    }
};

// Initial Chart Setup
let ctx = document.getElementById('paymentChart').getContext('2d');
let paymentChart = new Chart(ctx, {
    type: 'bar',
    data: chartData['weekly'],
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: false
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount ($)'
                }
            }
        }
    }
});

// Function to update chart based on dropdown selection
function updateChart() {
    const selectedPeriod = document.getElementById('time-period').value;
    paymentChart.data = chartData[selectedPeriod];
    paymentChart.update();
}

//dougnut
const ctd = document.getElementById('myDoughnutChart').getContext('2d');

        // Create gradient colors
        const gradientBoys = ctd.createLinearGradient(0, 0, 0, 400);
        gradientBoys.addColorStop(0, 'rgba(75, 192, 192, 1)');
        gradientBoys.addColorStop(1, 'rgba(75, 192, 192, 0.5)');

        const gradientGirls = ctd.createLinearGradient(0, 0, 0, 400);
        gradientGirls.addColorStop(0, 'rgba(255, 99, 132, 1)');
        gradientGirls.addColorStop(1, 'rgba(255, 99, 132, 0.5)');

        const data = {
            labels: ['Boys', 'Girls'],
            datasets: [{
                data: [60, 40], // Data values (you can modify these values as needed)
                backgroundColor: [gradientBoys, gradientGirls],
                borderWidth: 1,
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        };

        const myDoughnutChart = new Chart(ctd, {
            type: 'doughnut',
            data: data,
            options: options
        });

//number duration on top card
const targetNumbers = [50, 150, 250, 350]; // Updated target numbers for each paragraph
        const duration = 3000; // Updated duration of the animation in milliseconds

        function animateNumbers(target, element) {
            let start = 0;
            const stepTime = Math.ceil(duration / target);
            
            const interval = setInterval(() => {
                start++;
                element.textContent = start;

                if (start === target) {
                    clearInterval(interval);
                }
            }, stepTime);
        }

        document.addEventListener("DOMContentLoaded", () => {
            const paragraphs = [
                document.getElementById("number1"),
                document.getElementById("number2"),
                document.getElementById("number3"),
                document.getElementById("number4"),
            ];

            paragraphs.forEach((paragraph, index) => {
                animateNumbers(targetNumbers[index], paragraph);
            });
        });

//calendar
const calendar = document.getElementById("calendar");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const monthNameSpan = document.getElementById("month-name");
const eventList = document.getElementById("event-list");

let currentDate = new Date();  // This is today's date

const events = [
    { date: '2024-10-05', title: 'School Fair' },
    { date: '2024-10-15', title: 'Parent-Teacher Meeting' },
];

function loadCalendar(date) {
    calendar.innerHTML = '';
    eventList.innerHTML = '';
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const firstDayIndex = firstDay.getDay();
    
    // Display month name centered between arrows
    monthNameSpan.innerText = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Display events for the month at the top
    events.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = `${eventDate.toLocaleDateString()} - ${event.title}`;
            eventDiv.onclick = () => alert(`Event: ${event.title}\nDate: ${event.date}`);
            eventList.appendChild(eventDiv);
        }
    });

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendar.appendChild(emptyDiv);
    }
    
    // Add days of the month with highlighting for today
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = day;

        // Check if the day is today
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        calendar.appendChild(dayDiv);
    }
}

// Navigation functions
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
});

// Initial load
loadCalendar(currentDate);

//profile dropdown
// JavaScript to toggle dropdown
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        trigger.addEventListener('click', () => {
            dropdown.classList.toggle('is-active');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('is-active');
            });
        }
    });
});

//Add teacher
document.getElementById('showAddTeacherBtn').addEventListener('click', function() {
    const addTeacherSection = document.getElementById('addTeacherSection');
    if (addTeacherSection.style.display === 'none' || addTeacherSection.style.display === '') {
        addTeacherSection.style.display = 'block';
    } else {
        addTeacherSection.style.display = 'none';
    }
});

// Handle form submission
document.getElementById('addTeacherForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('teacherName').value;
    const subject = document.getElementById('teacherSubject').value;
    const email = document.getElementById('teacherEmail').value;
    const phone = document.getElementById('teacherPhone').value;

    if (name && subject && email && phone) {
        // Display a success message
        document.getElementById('successMessage').classList.remove('is-hidden');

        // Reset the form
        this.reset();

        // Hide the add teacher section after adding
        document.getElementById('addTeacherSection').style.display = 'none';
    }
});
//remove notification
