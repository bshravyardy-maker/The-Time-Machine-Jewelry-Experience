const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

const navLinks = document.querySelectorAll('header a[href^="#"]');
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const eraData = {
    artdeco: {
        title: 'Art Deco Grandeur',
        description: 'Discover stunning jewelry with bold geometric patterns, lavish ornamentation, and symmetrical designs. A celebration of modernity and luxury from the roaring twenties.',
        image: "url('https://images.unsplash.com/photo-1599643477877-53a81a4427a6?q=80&w=2787&auto=format&fit=crop')"
    },
    victorian: {
        title: 'Victorian Romance',
        description: 'Explore pieces rich with sentiment and symbolism. Featuring intricate metalwork, precious gems, and motifs inspired by nature, love, and mourning.',
        image: "url('https://images.unsplash.com/photo-1617038220399-e612752f9216?q=80&w=2803&auto=format&fit=crop')"
    },
    futuristic: {
        title: 'Futuristic Vision',
        description: 'Experience minimalist designs, unconventional materials, and sleek, sculptural forms. This is jewelry that pushes boundaries and imagines the aesthetics of tomorrow.',
        image: "url('https://images.unsplash.com/photo-1678813723360-9b4333faa835?q=80&w=2787&auto=format&fit=crop')"
    }
};

const eraButtons = document.querySelectorAll('.era-button');
const eraImage = document.getElementById('era-image');
const eraContent = document.getElementById('era-content');

eraButtons.forEach(button => {
    button.addEventListener('click', () => {
        const era = button.dataset.era;
        const data = eraData[era];
        
        eraButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        eraImage.style.backgroundImage = data.image;
        eraContent.style.opacity = 0;

        setTimeout(() => {
            eraContent.innerHTML = `
                <h4 class="text-xl font-bold mb-2">${data.title}</h4>
                <p class="text-gray-700">${data.description}</p>
            `;
            eraContent.style.opacity = 1;
        }, 300);
    });
});

const featureTabs = document.querySelectorAll('.feature-tab');
const tabPanes = document.querySelectorAll('.tab-pane');

featureTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabTarget = tab.dataset.tab;

        featureTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabPanes.forEach(pane => {
            if (pane.dataset.tabContent === tabTarget) {
                pane.classList.remove('hidden');
                pane.classList.add('active');
            } else {
                pane.classList.add('hidden');
                pane.classList.remove('active');
            }
        });
    });
});

const impactChartCanvas = document.getElementById('impactChart');
let impactChart = null;

const chartData = {
    labels: ['Engagement', 'Personalization', 'Conversion Rate'],
    datasets: [{
        label: 'Traditional E-Commerce',
        data: [30, 25, 5],
        backgroundColor: 'rgba(188, 175, 153, 0.6)',
        borderColor: 'rgba(188, 175, 153, 1)',
        borderWidth: 1,
        borderRadius: 4
    }, {
        label: 'Time Machine Experience',
        data: [85, 90, 25],
        backgroundColor: 'rgba(74, 69, 58, 0.8)',
        borderColor: 'rgba(74, 69, 58, 1)',
        borderWidth: 1,
        borderRadius: 4
    }]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(74, 69, 58, 0.1)'
            },
            ticks: {
                callback: function(value) {
                    return value + '%';
                },
                font: {
                   family: "'Inter', sans-serif"
                }
            }
        },
        x: {
           grid: {
                display: false
            },
            ticks: {
                font: {
                   family: "'Inter', sans-serif",
                   size: 14
                }
            }
        }
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                 font: {
                   family: "'Inter', sans-serif",
                   size: 14
                }
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y + '%';
                    }
                    return label;
                }
            }
        }
    }
};

const createChart = () => {
     if (impactChart) {
        impactChart.destroy();
    }
    impactChart = new Chart(impactChartCanvas.getContext('2d'), {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
};

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            createChart();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    if(impactChartCanvas) {
       chartObserver.observe(impactChartCanvas);
    }
});
