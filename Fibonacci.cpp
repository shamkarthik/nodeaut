#include <iostream>
#include <vector>

std::vector<unsigned long long> fibonacciSeries(int n) {
    std::vector<unsigned long long> series;
    if (n >= 1) {
        series.push_back(0);
    }
    if (n >= 2) {
        series.push_back(1);
    }
    for (int i = 2; i < n; ++i) {
        unsigned long long nextTerm = series[i - 1] + series[i - 2];
        series.push_back(nextTerm);
    }
    return series;
}

int main() {
    int terms;
    std::cout << "Enter the number of terms for Fibonacci series: ";
    std::cin >> terms;

    std::vector<unsigned long long> result = fibonacciSeries(terms);

    std::cout << "Fibonacci series up to " << terms << " terms: ";
    for (const auto& term : result) {
        std::cout << term << " ";
    }

    return 0;
}
