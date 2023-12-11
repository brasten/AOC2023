package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func getNumber(line string) (int, error) {
	if unicode.IsDigit(rune(line[0])) {
		return strconv.Atoi(string(line[0]))
	}

	switch {
	case strings.HasPrefix(line, "one"):
		return 1, nil
	case strings.HasPrefix(line, "two"):
		return 2, nil
	case strings.HasPrefix(line, "three"):
		return 3, nil
	case strings.HasPrefix(line, "four"):
		return 4, nil
	case strings.HasPrefix(line, "five"):
		return 5, nil
	case strings.HasPrefix(line, "six"):
		return 6, nil
	case strings.HasPrefix(line, "seven"):
		return 7, nil
	case strings.HasPrefix(line, "eight"):
		return 8, nil
	case strings.HasPrefix(line, "nine"):
		return 9, nil
	case strings.HasPrefix(line, "zero"):
		return 0, nil
	}

	return 0, fmt.Errorf("Could not parse number: %s", line)
}

func main() {
	filename := "day1.input.txt"

	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	total := 0

	scanner := bufio.NewScanner(file)
	// optionally, resize scanner's capacity for lines over 64K, see next example
	for scanner.Scan() {
		line := scanner.Text()

		var firstChar string
		var lastChar string

		for i := 0; i < len(line); i++ {
			l := i
			r := len(line) - i - 1

			if firstChar == "" {
				digit, err := getNumber(line[l:])
				if err == nil {
					firstChar = strconv.Itoa(digit)
				}
			}
			if lastChar == "" {
				digit, err := getNumber(line[r:])
				if err == nil {
					lastChar = strconv.Itoa(digit)
				}
			}

			if firstChar != "" && lastChar != "" {
				break
			}
		}

		atoi, err := strconv.Atoi(string(firstChar + lastChar))
		if err != nil {
			log.Fatal(err)
		}

		total += atoi
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	log.Println(fmt.Sprintf("Total: %d", total))
}
