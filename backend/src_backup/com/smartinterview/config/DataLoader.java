package com.smartinterview.config;

import com.smartinterview.entity.InterviewQuestion;
import com.smartinterview.entity.Question;
import com.smartinterview.repository.InterviewQuestionRepository;
import com.smartinterview.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final QuestionRepository questionRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (questionRepository.count() == 0) {
            questionRepository.saveAll(List.of(
                    Question.builder().title("What is 2 + 2?").optionA("3").optionB("4").optionC("5").optionD("6").correctAnswer("B").category("Aptitude").difficulty("Easy").build(),
                    Question.builder().title("Find the next number: 2, 4, 8, 16, ?").optionA("24").optionB("32").optionC("64").optionD("20").correctAnswer("B").category("Logical").difficulty("Medium").build()
            ));
        }

        if (interviewQuestionRepository.count() == 0) {
            interviewQuestionRepository.saveAll(List.of(
                    InterviewQuestion.builder().category("Java").difficulty("Medium").question("What is the difference between JDK, JRE, and JVM?").answer("JVM executes the bytecode. JRE is JVM + libraries. JDK is JRE + development tools.").build(),
                    InterviewQuestion.builder().category("DBMS").difficulty("Medium").question("What are ACID properties?").answer("Atomicity, Consistency, Isolation, Durability. They ensure reliable database transactions.").build()
            ));
        }
    }
}
